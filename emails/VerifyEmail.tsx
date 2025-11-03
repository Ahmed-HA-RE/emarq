import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  pixelBasedPreset,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : '';
type VerifyEmailProps = {
  url: string;
  name: string;
};

const VerifyEmail = ({ url, name }: VerifyEmailProps) => {
  return (
    <Tailwind config={{ presets: [pixelBasedPreset] }}>
      <Html>
        <Head />
        <Body style={main}>
          <Preview>Confirm your email address</Preview>
          <Container style={container}>
            <Section style={logoContainer}>
              <Img
                src={`${baseUrl}/static/logo.png`}
                width='50'
                height='50'
                alt='Emarq'
              />
            </Section>
            <Heading style={h1}>Confirm your email address</Heading>
            <Text className='text-2xl'>Hi {name},</Text>
            <Text className='text-lg mb-3'>
              We noticed you haven’t verified your email address yet. Please
              verify your email to gain full access to your account. Until you
              do, you won’t be able to:
            </Text>

            <Text className='my-0 mb-1 text-base font-bold list-item pl-1 ml-6'>
              List your properties
            </Text>
            <Text className='my-0 mb-6 text-base font-bold list-item ml-6 pl-1'>
              Access exclusive features
            </Text>
            <Section>
              <Button
                className='bg-blue-500 text-white text-center w-full rounded-full py-2 font-bold text-lg'
                href={url}
              >
                Verify email
              </Button>
            </Section>

            <Text style={text}>
              If you didn&apos;t request this email, there&apos;s nothing to
              worry about, you can safely ignore it.
            </Text>

            <Section>
              <Row style={footerLogos}>
                <Column style={{ width: '66%' }}>
                  <Img
                    src={`${baseUrl}/static/logo.png`}
                    width='40'
                    height='40'
                    alt='Emarq'
                  />
                </Column>
                <Column align='right'>
                  <Link href='https://www.instagram.com'>
                    <Img
                      src={`${baseUrl}/static/instagram-logo.png`}
                      width='32'
                      height='32'
                      alt='Instagram'
                      style={socialMediaIcon}
                    />
                  </Link>
                  <Link href='https://www.facebook.com'>
                    <Img
                      src={`${baseUrl}/static/facebook-logo.png`}
                      width='32'
                      height='32'
                      alt='Facebook'
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
              </Row>
            </Section>

            <Section>
              <Link
                style={footerLink}
                href={`${baseUrl}/`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Home
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link
                style={footerLink}
                href={`${baseUrl}/properties`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Properties
              </Link>
              <Text style={footerText}>
                ©2025 Emarq Estate, LLC, a Real Estate company. <br />
                Abu Dhabi, UAE <br />
                <br />
                All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default VerifyEmail;

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline',
};

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
};

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '8px',
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '0px 20px',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};
