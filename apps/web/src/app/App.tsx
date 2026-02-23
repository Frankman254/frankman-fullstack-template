import { type FC } from 'react';
import Footer from './components/Footer';
import Card from './components/Card';
import { Board } from './components/Board';
import { useState } from 'react';
import { sileo, Toaster } from 'sileo';
type BoardId = 'board1' | 'board2';

const arrayTasks = [
	{ id: 'task-1', title: 'Card 1', description: 'Card 1 description' },
	{ id: 'task-2', title: 'Card 2', description: 'Card 2 description' },
	{ id: 'task-3', title: 'Card 3', description: 'Card 3 description' },
	{ id: 'task-4', title: 'Card 4', description: 'Card 4 description' },
];

const App: FC = () => {
	const [draggedTask, setDraggedTask] = useState<string | null>(null);
	const [taskBoard, setTaskBoard] = useState<Record<string, BoardId>>({
		'task-1': 'board1',
		'task-2': 'board1',
		'task-3': 'board1',
		'task-4': 'board1',
	});

	const handleDrop = (targetBoard: BoardId) => {
		if (draggedTask) {
			setTaskBoard(prev => ({ ...prev, [draggedTask]: targetBoard }));
			setDraggedTask(null);
			sileo.success({
				title: 'Task moved to ' + targetBoard,
				description: 'Task moved to ' + targetBoard,
			});
		} else {
			sileo.error({
				title: 'No task to move',
				description: 'No task to move',
			});
		}
	};

	const preventDefault = (e: React.DragEvent) => e.preventDefault();

	return (
		<div className=" min-h-screen bg-gray-800">
			<Toaster position="top-right" />
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">
						{import.meta.env.VITE_APP_NAME || 'FrankmanTaskFast'}
					</h1>
					<p className="mt-2 text-gray-600">
						{import.meta.env.VITE_APP_DESCRIPTION ||
							'Kanban-Gantt Project Management'}
					</p>
				</div>
			</header>
			<main className="w-full mx-auto py-6 sm:px-6 lg:px-8 h-full flex flex-row gap-4">
				<Board
					title="Board 1"
					id="board1"
					onDragOver={preventDefault}
					onDrop={() => handleDrop('board1')}
				>
					{arrayTasks
						.filter(t => taskBoard[t.id] === 'board1')
						.map(task => (
							<div
								key={task.id}
								id={task.id}
								draggable
								onDragStart={() => setDraggedTask(task.id)}
								onDragEnd={() => setDraggedTask(null)}
								className="cursor-grab active:cursor-grabbing"
							>
								<Card
									title={task.title}
									description={task.description}
								/>
							</div>
						))}
				</Board>
				<Board
					title="Board 2"
					id="board2"
					onDragOver={preventDefault}
					onDrop={() => handleDrop('board2')}
				>
					{arrayTasks
						.filter(t => taskBoard[t.id] === 'board2')
						.map(task => (
							<div
								key={task.id}
								id={task.id}
								draggable
								onDragStart={() => setDraggedTask(task.id)}
								onDragEnd={() => setDraggedTask(null)}
								className="cursor-grab active:cursor-grabbing"
							>
								<Card
									title={task.title}
									description={task.description}
								/>
							</div>
						))}
				</Board>
			</main>
			<Footer />
		</div>
	);
};

export default App;
