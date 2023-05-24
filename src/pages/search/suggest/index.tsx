import React from "react";
import styles from "@styles/search.module.less";
import SuggestItem from "@pages/search/suggest/widgets/suggestItem";
interface Props {
  suggest: { origin: string; name: string }[];
}
function Suggest({ suggest }: Props) {
  return (
    <>
      <ul className={styles.suggest}>
        {suggest.map((item, index) => (
          <SuggestItem data={item.name} key={index} origin={item.origin} />
        ))}
      </ul>
    </>
  );
}

export default Suggest;
