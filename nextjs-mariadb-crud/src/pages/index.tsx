import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/product-list`);
  }, [router])
  return <></>;
  return (
    <div className="container text-center mt-5">
      <h1 className="text-primary"></h1>
    </div>
  );
}
