import VerifiedEmail from '@/components/VerifiedEmail';

const VerifiedEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { error: expiredToken } = await searchParams;

  return <VerifiedEmail expiredToken={expiredToken} />;
};

export default VerifiedEmailPage;
