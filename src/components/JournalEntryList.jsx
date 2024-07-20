import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Calls from "../utils/api";
import JournalEntryItem from "./JournalEntryItem";
import DataLoader from "./DataLoader";

const JournalEntryList = ({ journal, journalDetail }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateNewEntry = async () => {
    const newEntryContent = prompt("Enter the text for the new diary entry:");
    if (newEntryContent) {
      try {
        await Calls.journalEntryCreate({
          diaryId: journal.id,
          title: newEntryContent,
        });
        journalDetail();
      } catch (error) {
        console.error("Error creating new journal:", error);
        setError(error.message);
      }
    }
  };

  const handleEntryDelete =  (id) => async () => {
    if (window.confirm("Seš si jistý, že chceš tento záznam smazat?")) {
      await Calls.journalEntryDelete(id);
      await journalDetail();
    }
  };

  const handleEntryRename =  (journalEntry) => async () => {
    const newName = prompt("Enter the new name for the note:");
    if (newName) {
      console.log('new entry name:', newName)
      await Calls.journalEntryUpdate({
        ...journalEntry,
        newName: newName,
      });
      await journalDetail();
    }
  };

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <div
          onClick={handleCreateNewEntry}
          className="flex items-center justify-center h-48 w-full bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <span className="text-4xl text-gray-500">+</span>
        </div>
        {Array.isArray(journal?.children) && journal.children.map((journalEntry) => (
          <JournalEntryItem
            key={journalEntry.id}
            journalEntry={journalEntry}
            onDelete={handleEntryDelete(journalEntry.id)}
            onRename={handleEntryRename(journalEntry)}
          />
        ))}
      </div>
  );
};

JournalEntryList.propTypes = {
  journalId: PropTypes.string.isRequired,
};

export default JournalEntryList;
