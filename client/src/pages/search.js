import { Card, Loader } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchResult = () => {
  const router = useRouter();
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query;
      const fetchResult = async () => {
        setIsSearching((prev) => !prev);
        const res = await axios
          .get(process.env.API + `/audios/search/?q=${q}`)
          .catch((err) => console.log(err));
        setResult(res?.data);
        setIsSearching((prev) => !prev);
      };
      fetchResult();
    }
  }, [router.isReady, router.query.q]);
  if (isSearching) return <Loader />;
  if (result.length == 0) return <div>No result</div>;

  return (
    <>
      <div className="flex mt-5 flex-wrap justify-center gap-3">
        {result?.map((song) => (
          <Card key={song._id} song={song} />
        ))}
      </div>
    </>
  );
};

export default SearchResult;
