import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "./styles.module.scss";

const CustomTable = () => {
  const customers = Array?.from({ length: 10 }, (v, i) => ({
    id: 1 + i,
    name: "Apple Watch",
    price: "₦350,000",
    category: "Accessories",
    quantity: "7",
    rating: "5",
  }));

  const products = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
  ];
  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  /**elements */
  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
      </span>
    </div>
  );


  return (
    <div className="card">
      <div className={styles?.tableContainer}>
        <DataTable value={customers}>
          <Column field="name" header="Name"></Column>
          <Column field="price" header="Price"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="rating" header="Rating"></Column>
        </DataTable>
      </div>

      <div className={styles?.tableContainer}>
        <div></div>
        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          header={header}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="code" header="Code" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="category" header="Category" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default CustomTable;
