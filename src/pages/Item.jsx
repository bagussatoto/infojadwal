import {
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
	Box,
	Button,
	Image,

} from '@chakra-ui/react';
import { IconPlus } from '../components/Icons/Icons';
import { ModalDelete, ModalForm } from '../components/Modals/Modals';
import TodoItem from '../components/TodoItem';
import React ,{useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail } from '../server api/schedule';
import { destroy, store, update } from '../server api/schedule';
export default function Item() {
	let params = useParams();
	let { day } = params;
	const [todos, setTodos] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [todoSelected, setTodoSelected] = React.useState({});
	const {
		isOpen: isOpenAlert,
		onOpen: onOpenAlert,
		onClose: onCloseAlert,
	} = useDisclosure();
	const {
		isOpen: isOpenModalDelete,
		onOpen: onOpenModalDelete,
		onClose: onCloseModalDelete,
	} = useDisclosure();
	const {
		isOpen: isOpenModalForm,
		onOpen: onOpenModalForm,
		onClose: onCloseModalForm,
	} = useDisclosure();

	let navigate = useNavigate();
	useEffect(() => {
	const storedEmail = localStorage.getItem('email');
	getDetailSchedule(storedEmail); 
	}, []);

	const dayNames = {
		monday: 'Senin',
		tuesday: 'Selasa',
		wednesday: 'Rabu',
		thursday: 'Kamis',
		friday: 'Jumat',
		};

	const handleClickDelete = (data) => {
		setTodoSelected(data);
		onOpenModalDelete();
	};

	const handleDelete = async () => {
		onCloseModalDelete();
		try {
			const storedEmail = localStorage.getItem('email');
			await destroy(storedEmail,todoSelected.id);
			await getDetailSchedule();
			localStorage.setItem('alertStatus', 'open');
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
  // Mengecek status notifikasi yang disimpan di localStorage
  const alertStatus = localStorage.getItem('alertStatus');
  if (alertStatus === 'open') {
    onOpenAlert();
    // Menghapus status notifikasi dari localStorage setelah ditampilkan
    localStorage.removeItem('alertStatus');
  }
}, []);
	const handleModalForm = (data) => {
		setTodoSelected(data);
		onOpenModalForm();
	};

	const handleActionModalForm = async (dataForm) => {
	onCloseModalForm();
	try {
		const storedEmail = localStorage.getItem('email');

		if (todoSelected.id) {
			await update(storedEmail,todoSelected.id, dataForm.title);
		} else {
		await store(
			storedEmail,
			day,
			dataForm.title,
		);
		}
		await getDetailSchedule();
		window.location.reload();
	} catch (error) {
		console.log(error);
	}
	};

	const getDetailSchedule = React.useCallback(async (email) => {
	try {
		const { data } = await getDetail(email, day);
		const { data: todos, ...schedule } = data; 
		console.log("yola", todos);
		setTodos(todos); 
		setLoading(false);
	} catch (error) {
		setLoading(false);
		console.log(error);
	}
	}, [day]);

	React.useEffect(() => {
		getDetailSchedule();
	}, [getDetailSchedule]);

	return (
		<>
			<Box
				marginTop="43px"
				marginBottom="59px"
				display="flex"
				justifyContent="space-between"
			>
				<Box display="flex" gap="19px" alignItems="center">
					<Image
						data-cy="btn-back"
						src="/static/icons/todo-back-button.svg"
						alt="todo-back-button"
						width="24px"
						cursor="pointer"
						onClick={() => navigate(-1)}
					/>
						<Text
							data-cy="detail-title"
							textStyle="h1"
							onClick={() => setChangeTitle(true)}
						>
							{dayNames[day]}
						</Text>
				</Box>
				<Box display="flex" gap="18px">
					
					<Button
						data-cy="btn-create-schedule"
						minW="150px"
						height="54px"
						bg={'#D9019C'}
						color="white"
						borderRadius="45px"
						fontSize="18px"
						fontWeight="semibold"
						px="22px"
						py="13.5px"
						// leftIcon={<IconPlus />}
						onClick={() => handleModalForm({})}
					>
						+ Tambah Mata Kuliah
					</Button>
				</Box>
			</Box>
			{loading ? (
				<Box display="flex" justifyContent="center">
					<Spinner color="prime.900" size="lg" />
				</Box>
			) : (
				<Box data-cy="todo-item" marginBottom="50px">
					{todos.length > 0 ? (
						todos.map((data, i) => (
							<TodoItem
								dataCy={`todo-item-${i}`}
								key={data.id}
								{...data}
								handleDelete={handleClickDelete}
								handleEdit={() => handleModalForm(data)}
							/>
						))
					) : (
						<Box
							data-cy="todo-empty-state"
							display="flex"
							justifyContent="center"
						>
							<Image
								src="/assets/todo-empty-state.png"
								alt="todo-empty-state"
								onClick={() => handleModalForm({})}
							/>
						</Box>
					)}
				</Box>
			)}
			<ModalDelete
				isOpen={isOpenModalDelete}
				onClose={onCloseModalDelete}
				onAction={handleDelete}
				content={`Apakah anda yakin menghapus Mata Kuliah<br />
				<strong>“${todoSelected?.title}”?</strong>`}
			/>
			<ModalForm
				isOpen={isOpenModalForm}
				onClose={onCloseModalForm}
				onAction={handleActionModalForm}
				data={todoSelected}
				type={Object.keys(todoSelected).length ? 'edit' : 'add'}
			/>
			<Modal
				data-cy="modal-information"
				isOpen={isOpenAlert}
				onClose={onCloseAlert}
				isCentered
			>
				<ModalOverlay />
				<ModalContent
					data-cy="modal-information"
					minH={'58px'}
					minW="490px"
				>
					<ModalBody display="flex" alignItems={'center'}>
						<Image
							data-cy="modal-information-icon"
							src="/static/icons/modal-information-icon.svg"
							alt="modal-information-icon"
							mr="10px"
						/>
						<Text
							data-cy="modal-information-title"
							fontSize="14px"
							fontWeight="medium"
							color="#111111"
						>
							Mata kuliah berhasil dihapus
						</Text>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
