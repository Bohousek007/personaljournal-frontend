import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import RenameButton from "./RenameButton";

const JournalEntryItem = ({ journalEntry, onDelete, onRename }) => {
  return (
    <div className="flex flex-col justify-between h-48 w-full p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h1 className="text-xl font-semibold mb-2 text-purple-700">
        {journalEntry.title}adf
      </h1>
      <div className="flex space-x-2">
        <RenameButton id={journalEntry.id} onRename={onRename} />
        <DeleteButton
          id={journalEntry.id}
          name={journalEntry.title}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

JournalEntryItem.propTypes = {
  journalEntry: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  onRename: PropTypes.func,
};

export default JournalEntryItem;
