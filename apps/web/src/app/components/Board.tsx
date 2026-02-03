

export const Board = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col justify-between w-full h-full px-4 py-6 sm:px-0 border-4 border-dashed border-gray-200 rounded-lg">
            <div className="w-full flex flex-row justify-between">
				<div className="w-full">
					<h2 className="text-2xl font-bold">Board</h2>
				</div>
			</div>
            <div className="w-full flex flex-row justify-between max-h-[calc(100vh-10rem)]">
                {children}
            </div>

		</div>
	);
};