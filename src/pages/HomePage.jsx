import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { asyncPopulateUsersAndThreads } from '../states/threads/action';
import ThreadList from '../components/threads/ThreadList';
import ThreadInputModal from '../components/threads/ThreadInputModal';
import CategoryFilter from '../components/threads/CategoryFilter';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
    filterCategory = '',
  } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  function onAddThreadClick() {
    if (!authUser) {
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  }

  const categories = [
    ...new Set(threads.map((thread) => thread.category).filter(Boolean)),
  ];

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const filteredThreads = filterCategory
    ? threadList.filter((thread) => thread.category === filterCategory)
    : threadList;

  return (
    <section className="home-page">
      <div className="home-page-header">
        <div className="page-header">
          <h1>Diskusi Tersedia</h1>
          <p>Jelajahi dan diskusikan berbagai topik menarik bersama komunitas</p>
        </div>
        <button
          type="button"
          onClick={onAddThreadClick}
          className="btn btn-primary btn-add-thread"
        >
          <Plus size={18} />
          <span>Buat Diskusi</span>
        </button>
      </div>

      <CategoryFilter categories={categories} />

      <ThreadList threads={filteredThreads} />

      <ThreadInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

export default HomePage;
