import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import {
	getDaysSelected,
	getSessionDescriptionInputElement,
	getSessionNameInputElement,
} from '~/utils/documentUtils';
import Spinner from '~/components/Spinner';

const Session: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const ACTIVE_DAY_CLASS =
		'flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400';
	const INACTIVE_DAY_CLASS =
		'flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400';
	const [mondayActive, setMondayActive] = useState(false);

	const router = useRouter();

	const createSessionMutation = api.session.createSession.useMutation();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
	}, [status, router]);

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();

			const newSessionName = getSessionNameInputElement(document).value;
			const newSessionDescription =
				getSessionDescriptionInputElement(document).value;
			const daysSelected = getDaysSelected(document);

			const createSessionData = {
				name: newSessionName,
				description: newSessionDescription,
				userId: sessionData.user.id,
				days: daysSelected,
			};

			await createSessionMutation.mutateAsync(createSessionData, {
				onSuccess: () => {
					void router.push('/manage/sessions');
				},
			});
		}
	};

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
	};

	const handleButtonClicked = (elementId: string) => {
		const element = document.getElementById(elementId);
		if (element) {
			element.classList.toggle('bg-green-500');
		}
	};

	if (!sessionData) {
		return <Spinner />;
	}

	return (
		<Layout>
			<div className="flex flex-col">
				<div className="flex flex-row">
					<h1 className="pl-2 text-3xl font-bold">Create</h1>
				</div>
				<h2 className="pl-2 text-2xl font-bold">Session Information</h2>
				<form onSubmit={(e) => void handleSaveClicked(e)}>
					<div className="mat-4 flex">
						<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
							<label className="block font-bold">
								Session Name
							</label>
							<input
								id="sessionName"
								className=" rounded-md bg-gray-300 px-4 py-2 text-white"
								placeholder="Name"
								onChange={handleInputChange}
								required
							></input>
						</div>
					</div>
					<div className="mat-4 grid grid-cols-1">
						<label className="block pl-2 font-bold">
							Description
						</label>
						<textarea
							id="sessionDescription"
							className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
							placeholder="Description"
							onChange={handleInputChange}
							required
						></textarea>
					</div>

					{/* create multi-select of the days of the week checkboxs */}
					<div className="mat-4 grid grid-cols-1">
						<label className="block pl-2 font-bold">
							Day of the Week
						</label>
						<div className="mt-2 grid grid-cols-7">
							<label className="pl-2">
								<button
									id="sunday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									S
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="monday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									M
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="tuesday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									T
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="wednesday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									W
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="thursday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									T
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="friday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									F
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="saturday"
									type="button"
									className={
										mondayActive
											? ACTIVE_DAY_CLASS
											: INACTIVE_DAY_CLASS
									}
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									S
								</button>
							</label>
						</div>
					</div>

					<div className="mt-4">
						<h2 className="flex justify-center text-xl font-medium">
							Workouts
						</h2>
						<div className="flex justify-center font-medium">+</div>
					</div>

					{dataChangeInForm ? (
						<div className="mt-4 grid grid-cols-2 gap-1">
							<button
								className="ml-2 rounded-md bg-green-700 px-4 py-2 text-white"
								type="submit"
							>
								Save
							</button>
							<button
								className="mr-2 rounded-md bg-red-700 px-4 py-2 text-white"
								onClick={handleCancelClicked}
							>
								Cancel
							</button>
						</div>
					) : null}
				</form>
			</div>
		</Layout>
	);
};

export default Session;
