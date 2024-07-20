import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import RenameButton from "./RenameButton";

const Tile = ({ item, type, onDelete, onRename }) => {
  return (
    <div className="flex flex-col justify-between h-48 w-full p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h1 className="text-xl font-semibold mb-2 hover:text-purple-700">
        <Link to={`/${type}/${item.id}`}>{item.name}</Link>
      </h1>
      <div className="flex space-x-2">
        {" "}
        <RenameButton id={item.id} onRename={onRename} />
        <DeleteButton id={item.id} name={item.name} onDelete={onDelete} />
      </div>
    </div>
  );
};

Tile.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  type: PropTypes.string,
  onDelete: PropTypes.func,
  onRename: PropTypes.func,
};

export default Tile;
