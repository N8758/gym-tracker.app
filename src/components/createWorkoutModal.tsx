import React, { FormEvent } from 'react';
import XIcon from './icons/xIcon';
import { api } from '~/utils/api';

interface CreateWorkoutModalProps {
	onXClick: () => void;
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
	onXClick,
}) => {
	const exercises = api.exercise.getAllExercises.useQuery();

	const handleSaveClicked = (e: FormEvent<HTMLFormElement>) => {
		console.log(e);
	};

	const handleInputChange = () => {
		console.log('input changed');
	};

	return (
		<>
			<div className="fixed inset-0 z-10 flex items-center justify-center">
				<div className="absolute inset-0 bg-black opacity-50"></div>

				<div className="z-10 max-w-[23rem] rounded-lg bg-white p-16">
					<div className="flex flex-col justify-start">
						<button onClick={() => onXClick()}>
							<XIcon></XIcon>
						</button>
					</div>
					<h1 className="text-center text-2xl text-black">
						Create Workout
					</h1>
					<form onSubmit={(e) => void handleSaveClicked(e)}>
						<div className="mat-4 flex">
							<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
								<label className="block font-bold">
									Exercise
								</label>
								<select
									id="exerciseId"
									required
									className="rounded-md bg-gray-300  py-2 text-white"
								>
									{exercises
										? exercises.data?.map((exercise) => (
												<option
													key={exercise.id}
													value={exercise.id}
												>
													{exercise.name}
												</option>
										  ))
										: null}
								</select>
							</div>
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Weight (lbs)
								</label>
								<input
									id="weightLbs"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="75"
									onChange={handleInputChange}
									required
								></input>
							</div>
						</div>
						<div className="flex">
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Reps
								</label>
								<input
									id="reps"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="10"
									onChange={handleInputChange}
									required
								></input>
							</div>
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Sets
								</label>
								<input
									id="sets"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="3"
									onChange={handleInputChange}
									required
								></input>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateWorkoutModal;
