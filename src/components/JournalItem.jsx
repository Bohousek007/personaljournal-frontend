import PropTypes from "prop-types";
import Tile from "./Tile";

const JournalItem = ({ journal, onDelete, onRename }) => {
  return (
    <Tile
      item={journal}
      type="journals"
      onDelete={onDelete}
      onRename={onRename}
    />
  );
};

JournalItem.propTypes = {
  journal: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  onRename: PropTypes.func,
};

export default JournalItem;
