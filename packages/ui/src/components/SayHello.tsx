import * as React from "react";
import styles from "./SayHello.module.css";

const SayHello = ({ name }: { name: string }) => (
  <div className={styles.test}>Hey {name}, say hello to TypeScript.</div>
);

export default SayHello;
