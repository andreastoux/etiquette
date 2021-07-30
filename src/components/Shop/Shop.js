import React, { useState, useEffect } from "react";
import { Container, Filters, Products } from "../../styles/Shop.styles";
import Item from "./Item";
import SyncLoader from "react-spinners/SyncLoader";
import FilterSort from "../Utils/FilterSort";
import SortLabel from "../Utils/SortLabel";
import { API_URL, imageToUrl } from "../Utils/Urls";
import { v4 as uuidv4 } from "uuid";

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortParam, setSelectedSortParam] = useState(null);

  // all products fetch
  useEffect(() => {
    let isMounted = true;

    fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setFilteredProducts(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // categories fetch
  useEffect(() => {
    let isMounted = true;

    fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setCategories(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const sortParameters = [["Random"], ["Price (asc.)"], ["Price (desc.)"]];

  const filterCategory = (argument, match) => {
    let looper = [];
    for (let i = 0; i < argument.length; i++) {
      for (let category of argument[i].categories) {
        if (category.title === match) {
          if (argument[i].categories.includes(category)) {
            looper.push(argument[i]);
          }
        }
      }
    }
    setFilteredProducts(looper);
  };

  return (
    <Container>
      <div className="separator"></div>
      <div className="ourproducts">
        <h4>Our products</h4>
      </div>
      <div className="separator"></div>
      <Filters>
        <FilterSort
          prompt={"All products"}
          options={categories}
          value={selectedCategory}
          onChange={(selected) => {
            setSelectedCategory(selected);
            filterCategory(products, selected.title.toLowerCase());
          }}
        />
        <SortLabel
          prompt="Random"
          options={sortParameters}
          value={selectedSortParam}
          onChange={(selected) => {
            setSelectedSortParam(selected);
          }}
        />
      </Filters>
      <div className="separator"></div>
      <Products>
        {filteredProducts.length === 0 ? (
          <div className="loader">
            <SyncLoader size={30} loading={loading} />
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Item
              key={uuidv4()}
              url={`/shop/product/${product.url}`}
              name={product.name}
              price={Number(product.price).toFixed(2)}
              discount={
                product.discounted_price !== null ? (
                  "$" + Number(product?.discounted_price).toFixed(2)
                ) : (
                  <></>
                )
              }
              image={`${imageToUrl(product.image)}`}
            />
          ))
        )}
      </Products>
    </Container>
  );
}
