import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { SuitStyle } from "@/models/product.model";
import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    
  }, [q])

  return (
    <>
      <div className="container-fluid">
        <div className="row">

        </div>
      </div>
    </>
  );
};

export default Search;
