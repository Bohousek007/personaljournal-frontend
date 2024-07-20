import JournalList from "../components/JournalList";

const JournalsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Journals</h1>
      <JournalList />
    </div>
  );
};

export default JournalsPage;
