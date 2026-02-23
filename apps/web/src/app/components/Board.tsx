interface BoardProps {
	children: React.ReactNode;
	title: string;
	id?: string;
	onDrop?: (e: React.DragEvent) => void;
	onDragOver?: (e: React.DragEvent) => void;
}

export const Board = (props: BoardProps) => {
	const { children, title, id, onDrop, onDragOver } = props;
	return (
		<div className="flex flex-col justify-between w-full h-full px-4 py-6 sm:px-0 border-4 border-dashed border-gray-200 rounded-lg">
			<div className="w-full flex flex-row justify-between">
				<div className="w-full">
					<h2 className="text-2xl font-bold">{title}</h2>
				</div>
			</div>
			<div
				id={id}
				className="w-full flex flex-row justify-between max-h-[calc(100vh-10rem)] min-h-[200px] gap-2 flex-wrap content-start"
				onDrop={onDrop}
				onDragOver={onDragOver}
			>
				{children}
			</div>
		</div>
	);
};
