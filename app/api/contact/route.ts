import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
  browser?: string;
  operatingSystem?: string;
  deviceType?: string;
  hcaptchaToken: string; // Added for hCaptcha
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
};

const createAdminEmailContent = (formData: ContactFormData, locale: string) => {
  const subject = locale === 'tr'
    ? `Yeni İletişim Formu Mesajı: ${formData.firstName} ${formData.lastName}`
    : `New Contact Form Message: ${formData.firstName} ${formData.lastName}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #a90013; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
        ${locale === 'tr' ? 'Yeni İletişim Formu Mesajı' : 'New Contact Form Message'}
      </h2>
      <p><strong>${locale === 'tr' ? 'Gönderen' : 'From'}:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>${locale === 'tr' ? 'Telefon' : 'Phone'}:</strong> ${formData.phone}</p>` : ''}
      
      <div style="margin-top: 20px; background-color: #f9f9f9; padding: 10px; border-left: 4px solid #666;">
        <h3 style="color: #555; margin-top: 0;">${locale === 'tr' ? 'Cihaz Bilgileri' : 'Device Information'}:</h3>
        <p><strong>${locale === 'tr' ? 'Tarayıcı' : 'Browser'}:</strong> ${formData.browser || 'Not detected'}</p>
        <p><strong>${locale === 'tr' ? 'İşletim Sistemi' : 'Operating System'}:</strong> ${formData.operatingSystem || 'Not detected'}</p>
        <p><strong>${locale === 'tr' ? 'Cihaz Türü' : 'Device Type'}:</strong> ${formData.deviceType || 'Not detected'}</p>
      </div>
      
      <div style="margin-top: 20px;">
        <h3 style="color: #555;">${locale === 'tr' ? 'Mesaj' : 'Message'}:</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013;">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #e5e5e5; padding-top: 10px;">
        ${locale === 'tr'
          ? 'Bu e-posta, web sitenizdeki iletişim formundan otomatik olarak gönderilmiştir.'
          : 'This email was automatically sent from the contact form on your website.'}
      </p>
    </div>
  `;

  return { subject, htmlBody };
};

const createConfirmationEmailContent = (formData: ContactFormData, locale: string) => {
  const subject = locale === 'tr'
    ? 'İletişim Formunuz Alındı - BYM Türkiye'
    : 'Your Contact Form Has Been Received - BYM Turkey';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #a90013; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
        ${locale === 'tr' ? 'İletişim Talebiniz Alındı' : 'Your Contact Request Has Been Received'}
      </h2>
      <p>
        ${locale === 'tr'
          ? `Sayın ${formData.firstName} ${formData.lastName},`
          : `Dear ${formData.firstName} ${formData.lastName},`}
      </p>
      <p>
        ${locale === 'tr'
          ? 'İletişim formu aracılığıyla gönderdiğiniz mesajınız başarıyla alınmıştır. En kısa sürede size geri dönüş yapacağız.'
          : 'Your message sent through our contact form has been successfully received. We will get back to you as soon as possible.'}
      </p>
      
      <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013;">
        <h3 style="color: #555; margin-top: 0;">${locale === 'tr' ? 'Mesajınızın Özeti' : 'Summary of Your Message'}:</h3>
        <p><strong>${locale === 'tr' ? 'İletilme Tarihi' : 'Submission Date'}:</strong> ${new Date().toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US')}</p>
        <p><strong>${locale === 'tr' ? 'Konu' : 'Subject'}:</strong> ${locale === 'tr' ? 'İletişim Formu Mesajı' : 'Contact Form Message'}</p>
      </div>
      
      <p style="margin-top: 20px;">
        ${locale === 'tr'
          ? 'Bizimle iletişime geçtiğiniz için teşekkür ederiz.'
          : 'Thank you for contacting us.'}
      </p>
      
      <p>
        ${locale === 'tr'
          ? 'Saygılarımızla,'
          : 'Best regards,'}
        <br />
        <strong>BYM Türkiye</strong>
        <br />
        <strong>UNILAB Vision</strong>
      </p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #e5e5e5; padding-top: 10px;">
        ${locale === 'tr'
          ? 'Bu e-posta, web sitemizdeki iletişim formuna gönderdiğiniz mesaja yanıt olarak otomatik olarak gönderilmiştir. Lütfen bu e-postayı yanıtlamayınız.'
          : 'This email was automatically sent in response to your message submitted through our website contact form. Please do not reply to this email.'}
      </p>
    </div>
  `;

  return { subject, htmlBody };
};

const verifyDatabaseConnection = async () => {
  try {
    const { error } = await supabase.from('contact_messages').select('count').limit(1);
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};

const verifyHcaptcha = async (token: string) => {
  const secretKey = process.env.HCAPTCHA_SECRET_KEY || '';
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `response=${encodeURIComponent(token)}&secret=${encodeURIComponent(secretKey)}`,
  });

  const result = await response.json();
  return result.success;
};

export async function POST(request: NextRequest) {
  console.log('Contact form submission received');

  try {
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully');
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      locale,
      browser,
      operatingSystem,
      deviceType,
      hcaptchaToken,
    } = body as ContactFormData;

    if (!firstName || !lastName || !email || !message || !hcaptchaToken) {
      console.warn('Missing required fields:', {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        message: !!message,
        hcaptchaToken: !!hcaptchaToken,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Verifying hCaptcha token...');
    const isHcaptchaValid = await verifyHcaptcha(hcaptchaToken);
    if (!isHcaptchaValid) {
      console.warn('hCaptcha verification failed');
      return NextResponse.json(
        { error: 'hCaptcha verification failed' },
        { status: 400 }
      );
    }
    console.log('hCaptcha verified successfully');

    const isDatabaseConnected = await verifyDatabaseConnection();
    if (!isDatabaseConnected) {
      console.error('Database connection failed, unable to save message');
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    console.log('Inserting message into database...');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone || null,
            message: message,
            locale: locale || 'tr',
            created_at: new Date().toISOString(),
            status: 'new',
            browser: browser || null,
            operating_system: operatingSystem || null,
            device_type: deviceType || null,
          },
        ]);

      if (error) {
        console.error('Failed to insert message into database:', error);
        return NextResponse.json(
          { error: 'Failed to save message to database' },
          { status: 500 }
        );
      }

      console.log('Message saved to database successfully');
    } catch (dbError) {
      console.error('Unexpected database error:', dbError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        console.log('Setting up email transporter...');
        const transporter = nodemailer.createTransport(emailConfig);

        console.log('Sending admin notification email...');
        const notificationEmails = (process.env.NOTIFICATION_EMAILS || 'info@unidc.org').split(',');
        const { subject: adminSubject, htmlBody: adminHtmlBody } = createAdminEmailContent(body as ContactFormData, locale || 'tr');

        const adminEmailResult = await transporter.sendMail({
          from: `"BYM Türkiye" <${emailConfig.auth.user}>`,
          to: notificationEmails.join(', '),
          subject: adminSubject,
          html: adminHtmlBody,
          replyTo: email,
        });

        console.log('Admin notification email sent successfully:', adminEmailResult.messageId);

        console.log('Sending confirmation email to the sender...');
        const { subject: confirmationSubject, htmlBody: confirmationHtmlBody } = createConfirmationEmailContent(body as ContactFormData, locale || 'tr');

        const confirmationEmailResult = await transporter.sendMail({
          from: `"BYM Türkiye" <${emailConfig.auth.user}>`,
          to: email,
          subject: confirmationSubject,
          html: confirmationHtmlBody,
        });

        console.log('Confirmation email sent successfully:', confirmationEmailResult.messageId);
      } catch (emailError) {
        console.error('Failed to send email notifications:', emailError);
      }
    } else {
      console.warn('Email not configured, skipping email notifications');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Unhandled error in contact form submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}