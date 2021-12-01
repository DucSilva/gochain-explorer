import React, { useState } from "react";

import type { NextPage } from "next";
import { ROUTES } from "@Utils/constants";
import { request } from "@Pages/api/handler";
import { toastInformation } from "@Redux/actions/home";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Search: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("");
  const search = async (e: any) => {
    e.preventDefault();
    const valueS = value.trim();
    if (valueS.length === 42) {
      await router.push(`/${ROUTES.ADDRESS}/${valueS}`);
    } else if (valueS.length === 66) {
      request
        .checkBlockExist(valueS)
        .then((res) => {
          router.push(`/${ROUTES.BLOCK}/${valueS}`);
        })
        .catch((error) => {
          request
            .checkTransactionExist(valueS)
            .then((res) => router.push(`/${ROUTES.TRANSACTION}/${valueS}`))
            .catch((error) => {
              dispatch(
                toastInformation({
                  show: true,
                  content: "the data you entered is not valid",
                  status: 'warning',
                })
              );
            });
        });
    } else if (valueS.length < 8 && /^\d+$/.test(valueS)) {
      await router.push(`/${ROUTES.BLOCK}/${valueS}`);
    } else {
      dispatch(
        toastInformation({
          show: true,
          content: "the data you entered is not valid",
          status: 'warning',
        })
      );
      return;
    }
  };

  return (
    <form className="input-group" onSubmit={(e) => search(e)}>
      <input
        name="search"
        type="text"
        className="form-control"
        placeholder="Search by transaction, address or block"
        aria-label="Search by transaction, address or block"
        aria-describedby="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="submit"
          id="search"
          disabled={!value}
        >
          <img src="/assets/icons/search.svg" alt="Search" />
        </button>
      </div>
    </form>
  );
};

export default Search;
