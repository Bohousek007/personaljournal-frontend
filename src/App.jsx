import { useState, useEffect, } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { data } from 'autoprefixer';


const HomePage = () => (
  <div>
    <h1>Welcome 2 My Journal</h1>
    <div className="card">
      <Link to="/journals">View Journals</Link>
    </div>
  </div>
);

const JournalsPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (journalId) => {
    try {
      await axios.delete(`http://localhost:8000/denik/get?id=${journalId}`);
      setJournals(journals.filter(journal => journal.id !== journalId));
    } catch (error) {
      console.error('Error deleting the journal:', error);
    }
  };

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/denik/list');
        setJournals(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  const handleCreateNewJournal = async () => {
    const journalName = prompt('Enter the name for the new journal:');
    if (journalName) {
      try {
        const response = await axios.post(`http://localhost:8000/denik/create`, { name: journalName });
        setJournals([...journals, response.data]);
      } catch (error) {
        console.error('Error creating new journal:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        {journals.length > 0 ? (
          <ul>
            {journals.map((journal, index) => (
              <li key={journal.id}>
                <h1 className='p-2 hover:text-purple-700'>
                  <Link to={`/journals/${journal.id}`}>
                    {journal.name}
                  </Link>
                </h1>
              </li>
            ))}
          </ul>
        ) : (
          <p>No journals found.</p>
        )}

        <button
          onClick={handleCreateNewJournal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 my-3"
        >
          Create New Journal
        </button>
      </div>
    </>
  );
};

function JournalDetail() {
  const { journalId } = useParams();
  const [journal, setJournal] = useState(null);
  const navigate = useNavigate();
  const handleCreateNewEntry = () => {
    const newEntryContent = prompt('Enter the text for the new diary entry:');
    if (newEntryContent) {
      axios.post(`http://localhost:8000/denikEntry/create`, {
        diaryId: journal.id,
        title: newEntryContent
      })
        .then(response => {
          // Assuming the response contains the new entry object
          const newEntry = response.data;
          setJournal(currentJournal => {
            return {
              ...currentJournal,
              children: [...currentJournal.children, newEntry]
            };
          });
          console.log("+++", journal)
        })
        .catch(error => {
          console.error('Error adding new diary entry:', error);
        });
    }
  };

  const handleEntryDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      axios.post(`http://localhost:8000/denikEntry/delete/`, {"id": id})
        .then(response => {
          setJournal(currentJournal => {
            if (currentJournal && currentJournal.children) {
              const updatedChildren = currentJournal.children.filter(child => child.id !== id);
              return { ...currentJournal, children: updatedChildren };
            }
            return currentJournal;
          });
          console.log('Journal entry deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting journal entry:', error);
          alert('An error occurred while deleting the journal entry. Please try again.');
        });
    }
  };

  const handleEntryRename = (id) => {
    const newName = prompt('Enter the new name for the note:');
    if (newName) {
      axios.post(`http://localhost:8000/denikEntry/update`, { "id": id, "newName": newName })
        .then(response => {
          setJournal(currentJournal => {
            if (currentJournal && currentJournal.children) {
              const updatedChildren = currentJournal.children.map(child => {
                if (child.id === id) {
                  return { ...child, title: newName };
                }
                return child;
              });
              return { ...currentJournal, children: updatedChildren }; // Create a new object
            }
            return currentJournal;
          });
        })
        .catch(error => console.error('Error updating note name:', error));
    }
  };

  const handleDelete = (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal? All subnotes will be lost!')) {
      axios.post(`http://localhost:8000/denik/delete/`, {"id": journalId})
        .then(response => {
          navigate('/journals');
         window.alert('Deletion OK');
        })
        .catch(error => {
          console.error('Error deleting the journal:', error);
          alert('An error occurred while deleting the journal. Please try again.');
        });
    }
  };

  const handleRename = (id) => {
    const newName = prompt('Enter the new name for the journal:');
    if (newName) {
      axios.post(`http://localhost:8000/denik/update`, { "id": id, "newName": newName })
        .then(response => {
          setJournal(currentJournal => {
            if (currentJournal && currentJournal.id === id) {
              return { ...currentJournal, name: newName };
            }
            return currentJournal;
          });
        })
        .catch(error => console.error('Error updating journal name:', error));
    }
  };

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/denik/get?id=${journalId}`);
        console.log(response.data);
        setJournal(response.data);
      } catch (error) {
        console.error('Error fetching journal details:', error);
      }
    };

    fetchJournal();
  }, [journalId]);

  if (!journal) {
    return <p>Loading...</p>;
  }

  return (
    <div className='items-start'>
      <h1 className='pb-4'><span className='text-orange-600'>{journal.name}</span></h1>
      <button
        onClick={() => handleDelete(journal.id)}
        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Delete journal
      </button>
      <button
        onClick={() => handleRename(journal.id)}
        className="ml-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Rename journal
      </button>

      <button onClick={handleCreateNewEntry} className="ml-2 px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-700">
        New Diary Entry
      </button>
      <ul className='pt-9'>
        {journal.children.map((journalEntry, index) => (
          <li key={index + 1} className='text-4xl p-1'>
            <p>
              {index + 1}. {journalEntry.title}
              <button onClick={() => handleEntryRename(journalEntry.id)} className="text-xs ml-1 px-1 py-1 text-white rounded">
                Rename
              </button>
              <button onClick={() => handleEntryDelete(journalEntry.id)} className="text-xs ml-1 px-1 py-1 text-white rounded">
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
      {/* Additional journal fields can be displayed here */}
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/journals/:journalId" element={<JournalDetail />} />
      </Routes>
    </Router>
  );
}

export default App;