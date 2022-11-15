import DirectoryItem from "../directoryItem/DirectoryItem";
import "./Directory.scss";
import { homeCategoryData } from "../../utils/homeCategoryData";

const Directory = () => {
  return (
    <div className="directory-container">
      {homeCategoryData.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
