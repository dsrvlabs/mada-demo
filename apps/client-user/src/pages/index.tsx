import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/voucher/admin");
  }, [router]);

  return <div />;
};

export default Index;
