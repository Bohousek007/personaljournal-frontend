import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calls from "../utils/api";
import JournalEntryList from "../components/JournalEntryList";

function JournalDetail() {
  const { journalId } = useParams();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchJournal = async () => {
    try {
      setLoading(true);
      const data = await Calls.journalDetail(journalId);
      setJournal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, [journalId]);

  if (!journal) {
    return <p>Loading...</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/journals")}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
      >
        Zpátky do Journals
      </button>
      <h1 className="text-2xl font-bold mb-4">{journal.name}</h1>
      <JournalEntryList journalId={journalId} journal={journal} journalDetail={fetchJournal} />
    </div>
  );
}

export default JournalDetail;
