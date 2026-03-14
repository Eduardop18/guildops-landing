import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, guildName, realm, role } = body ?? {};

    // Validate required fields
    if (!email || !guildName || !realm || !role) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSignup = await prisma.betaSignup.findUnique({
      where: { email },
    });

    if (existingSignup) {
      return NextResponse.json(
        { success: false, message: 'Este email ya está registrado' },
        { status: 400 }
      );
    }

    // Save to database
    const signup = await prisma.betaSignup.create({
      data: {
        email,
        guildName,
        realm,
        role,
      },
    });

    // Send notification email
    try {
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; padding: 30px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8b5cf6; margin: 0;">🎮 Nuevo Beta Signup</h1>
            <p style="color: #888;">GuildOps</p>
          </div>
          
          <div style="background: #141414; padding: 20px; border-radius: 8px; border: 1px solid #333;">
            <h2 style="color: #fbbf24; margin-top: 0;">Detalles del registro:</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #333;">Email:</td>
                <td style="padding: 10px 0; color: #fff; border-bottom: 1px solid #333;">
                  <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #333;">Guild:</td>
                <td style="padding: 10px 0; color: #fff; border-bottom: 1px solid #333;">${guildName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #333;">Realm:</td>
                <td style="padding: 10px 0; color: #fff; border-bottom: 1px solid #333;">${realm}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Rol:</td>
                <td style="padding: 10px 0; color: #fff;">${role}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
            Registrado el: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Caracas' })}
          </p>
        </div>
      `;

      const appUrl = process.env.NEXTAUTH_URL || '';
      const appName = 'GuildOps';
      let senderEmail = 'noreply@mail.abacusai.app';
      try {
        if (appUrl) {
          senderEmail = `noreply@${new URL(appUrl).hostname}`;
        }
      } catch (e) {
        // Use default sender email
      }

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_BETA_SIGNUP_NOTIFICATION,
          subject: `🎮 Nuevo Beta Signup: ${guildName} (${realm})`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'eduardoparraof@gmail.com',
          sender_email: senderEmail,
          sender_alias: appName,
        }),
      });
    } catch (emailError) {
      // Log email error but don't fail the signup
      console.error('Error sending notification email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: '¡Registro exitoso!',
      data: { id: signup.id },
    });
  } catch (error) {
    console.error('Beta signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
