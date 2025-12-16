// app/api/representative-application/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface RepresentativeData {
  clerk_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  country: string;
  city: string;
  university_school: string;
  department: string;
  grade: string;
  language_skills: string;
  other_communities: string | null;
  about_yourself: string;
  motivation: string;
  planned_activities: string;
  expectations: string;
  additional_notes: string | null;
  terms_accepted: boolean;
  privacy_policy_accepted: boolean;
  locale?: string;
}

const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
};

const createAdminEmailContent = (formData: RepresentativeData, locale: string) => {
  const subject = locale === 'tr'
    ? `Yeni Temsilcilik Başvurusu: ${formData.first_name} ${formData.last_name}`
    : `New Representative Application: ${formData.first_name} ${formData.last_name}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #a90013; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
        ${locale === 'tr' ? 'Yeni Temsilcilik Başvurusu' : 'New Representative Application'}
      </h2>
      <p><strong>${locale === 'tr' ? 'Ad Soyad' : 'Name'}:</strong> ${formData.first_name} ${formData.last_name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>${locale === 'tr' ? 'Telefon' : 'Phone'}:</strong> ${formData.phone_number}</p>
      <p><strong>${locale === 'tr' ? 'Doğum Tarihi' : 'Birth Date'}:</strong> ${formData.birth_date}</p>
      <p><strong>${locale === 'tr' ? 'Ülke' : 'Country'}:</strong> ${formData.country}</p>
      <p><strong>${locale === 'tr' ? 'Şehir' : 'City'}:</strong> ${formData.city}</p>
      
      <div style="margin-top: 20px; background-color: #f9f9f9; padding: 10px; border-left: 4px solid #666;">
        <h3 style="color: #555; margin-top: 0;">${locale === 'tr' ? 'Akademik Bilgiler' : 'Academic Information'}:</h3>
        <p><strong>${locale === 'tr' ? 'Üniversite/Okul' : 'University/School'}:</strong> ${formData.university_school}</p>
        <p><strong>${locale === 'tr' ? 'Bölüm' : 'Department'}:</strong> ${formData.department}</p>
        <p><strong>${locale === 'tr' ? 'Sınıf' : 'Grade'}:</strong> ${formData.grade}</p>
        <p><strong>${locale === 'tr' ? 'Dil Yetenekleri' : 'Language Skills'}:</strong> ${formData.language_skills}</p>
        ${formData.other_communities ? `<p><strong>${locale === 'tr' ? 'Diğer Topluluklar' : 'Other Communities'}:</strong> ${formData.other_communities}</p>` : ''}
      </div>
      
      <div style="margin-top: 20px;">
        <h3 style="color: #555;">${locale === 'tr' ? 'Başvuru Detayları' : 'Application Details'}:</h3>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013; margin-bottom: 15px;">
          <h4 style="margin-top: 0;">${locale === 'tr' ? 'Kendi Hakkında' : 'About Themselves'}:</h4>
          ${formData.about_yourself.replace(/\n/g, '<br>')}
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013; margin-bottom: 15px;">
          <h4 style="margin-top: 0;">${locale === 'tr' ? 'Motivasyon' : 'Motivation'}:</h4>
          ${formData.motivation.replace(/\n/g, '<br>')}
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013; margin-bottom: 15px;">
          <h4 style="margin-top: 0;">${locale === 'tr' ? 'Planlanan Etkinlikler' : 'Planned Activities'}:</h4>
          ${formData.planned_activities.replace(/\n/g, '<br>')}
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013; margin-bottom: 15px;">
          <h4 style="margin-top: 0;">${locale === 'tr' ? 'Beklentiler' : 'Expectations'}:</h4>
          ${formData.expectations.replace(/\n/g, '<br>')}
        </div>
        
        ${formData.additional_notes ? `
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013;">
          <h4 style="margin-top: 0;">${locale === 'tr' ? 'Ek Notlar' : 'Additional Notes'}:</h4>
          ${formData.additional_notes.replace(/\n/g, '<br>')}
        </div>
        ` : ''}
      </div>
      
      <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #e5e5e5; padding-top: 10px;">
        ${locale === 'tr'
          ? 'Bu e-posta, web sitenizdeki temsilcilik başvuru formundan otomatik olarak gönderilmiştir.'
          : 'This email was automatically sent from the representative application form on your website.'}
      </p>
    </div>
  `;

  return { subject, htmlBody };
};

const createConfirmationEmailContent = (formData: RepresentativeData, locale: string) => {
  const subject = locale === 'tr'
    ? 'Temsilcilik Başvurunuz Alındı - BYM Türkiye'
    : 'Your Representative Application Has Been Received - BYM Turkey';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #a90013; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
        ${locale === 'tr' ? 'Temsilcilik Başvurunuz Alındı' : 'Your Representative Application Has Been Received'}
      </h2>
      <p>
        ${locale === 'tr'
          ? `Sayın ${formData.first_name} ${formData.last_name},`
          : `Dear ${formData.first_name} ${formData.last_name},`}
      </p>
      <p>
        ${locale === 'tr'
          ? 'Temsilcilik başvuru formu aracılığıyla gönderdiğiniz başvurunuz başarıyla alınmıştır. Başvurunuz değerlendirildikten sonra sizinle iletişime geçeceğiz.'
          : 'Your application submitted through our representative application form has been successfully received. We will contact you after your application has been evaluated.'}
      </p>
      
      <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a90013;">
        <h3 style="color: #555; margin-top: 0;">${locale === 'tr' ? 'Başvurunuzun Özeti' : 'Summary of Your Application'}:</h3>
        <p><strong>${locale === 'tr' ? 'Başvuru Tarihi' : 'Application Date'}:</strong> ${new Date().toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US')}</p>
        <p><strong>${locale === 'tr' ? 'Üniversite/Okul' : 'University/School'}:</strong> ${formData.university_school}</p>
        <p><strong>${locale === 'tr' ? 'Bölüm' : 'Department'}:</strong> ${formData.department}</p>
      </div>
      
      <p style="margin-top: 20px;">
        ${locale === 'tr'
          ? 'Temsilcilik programımıza gösterdiğiniz ilgi için teşekkür ederiz.'
          : 'Thank you for your interest in our representative program.'}
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
          ? 'Bu e-posta, web sitemizdeki temsilcilik başvuru formuna gönderdiğiniz mesaja yanıt olarak otomatik olarak gönderilmiştir. Lütfen bu e-postayı yanıtlamayınız.'
          : 'This email was automatically sent in response to your application submitted through our website representative application form. Please do not reply to this email.'}
      </p>
    </div>
  `;

  return { subject, htmlBody };
};

export async function POST(request: NextRequest) {
  console.log('Representative application notification request received');

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

    // Extract email and locale which are the only fields we actually use in this function
    const { email, locale = 'tr' } = body as RepresentativeData;

    // Validate that we have the applicant's email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required for sending notifications' },
        { status: 400 }
      );
    }

    // Send email notifications
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        console.log('Setting up email transporter for representative application...');
        const transporter = nodemailer.createTransport(emailConfig);

        console.log('Sending admin notification email for representative application...');
        const notificationEmails = (process.env.REPRESENTATIVE_NOTIFICATION_EMAILS || process.env.NOTIFICATION_EMAILS || 'info@unidc.org').split(',');
        const { subject: adminSubject, htmlBody: adminHtmlBody } = createAdminEmailContent(body as RepresentativeData, locale);

        const adminEmailResult = await transporter.sendMail({
          from: `"BYM Türkiye - UNIDC" <${emailConfig.auth.user}>`,
          to: notificationEmails.join(', '),
          subject: adminSubject,
          html: adminHtmlBody,
          replyTo: email,
        });

        console.log('Admin notification email sent successfully:', adminEmailResult.messageId);

        console.log('Sending confirmation email to the applicant...');
        const { subject: confirmationSubject, htmlBody: confirmationHtmlBody } = createConfirmationEmailContent(body as RepresentativeData, locale);

        const confirmationEmailResult = await transporter.sendMail({
          from: `"BYM Türkiye - UNIDC" <${emailConfig.auth.user}>`,
          to: email,
          subject: confirmationSubject,
          html: confirmationHtmlBody,
        });

        console.log('Confirmation email sent successfully:', confirmationEmailResult.messageId);
        
        return NextResponse.json({ 
          success: true,
          message: 'Email notifications sent successfully' 
        }, { status: 200 });
      } catch (emailError) {
        console.error('Failed to send email notifications:', emailError);
        return NextResponse.json({ 
          error: 'Failed to send email notifications',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        }, { status: 500 });
      }
    } else {
      console.warn('Email not configured, skipping email notifications');
      return NextResponse.json({ 
        success: false,
        message: 'Email notifications not configured' 
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Unhandled error in representative application notification:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}