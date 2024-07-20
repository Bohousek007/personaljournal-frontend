const DeleteButton = ({ id, name, onDelete }) => {
  return (
    <button
      onClick={() => onDelete(id, name)}
      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Smazat
    </button>
  );
};

export default DeleteButton;
