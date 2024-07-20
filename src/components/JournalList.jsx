import { useCallback, useEffect, useState } from "react";
import Calls from "../utils/api";
import JournalItem from "../components/JournalItem";
import DataLoader from "./DataLoader";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const journalList = useCallback(async () => {
    try {
      setLoading(true);
      const data = await Calls.journalList();
      setJournals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = (id, name) => async () => {
    if (window.confirm(`Opravdu chceš smazat tento deník? ${name}?`)) {
      try {
        await Calls.journalDelete(id);
        journalList();
      } catch (error) {
        console.error("Error deleting journal:", error);
        setError(error.message);
      }
    }
  };

  // Prompt na změnu jména deníku
  const handleRename = (id) => async () => {
    const newName = window.prompt("Napiš nový jméno deníku: ");
    if (newName) {
      try {
        await Calls.journalUpdate({
          id: id,
          newName: newName,
        });
        journalList();
      } catch (error) {
        console.error("Error renaming journal:", error);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    journalList();
  }, [journalList]);

  const handleCreateNewJournal = async () => {
    const journalName = window.prompt("Enter the name for the new journal:");
    if (journalName) {
      try {
        await Calls.journalCreate({ name: journalName });
        journalList();
      } catch (error) {
        console.error("Error creating new journal:", error);
        setError(error.message);
      }
    }
  };

  if (!Array.isArray(journals)) return null

  return (
    <DataLoader url="http://localhost:8000/journals" loading={loading} error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <div
          onClick={handleCreateNewJournal}
          className="flex items-center justify-center h-48 w-full bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <span className="text-4xl text-gray-500">+</span>
        </div>
        {journals.map((journal) => (
          <JournalItem
            key={journal.id}
            journal={journal}
            onDelete={handleDelete(journal.id)}
            onRename={handleRename(journal.id)}
          />
        ))}
      </div>
    </DataLoader>
  );
};

export default JournalList;
