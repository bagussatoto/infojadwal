import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

export function ModalForm({ isOpen, onClose, onAction, data, type }) {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { dirtyFields },
		control,
	} = useForm({
		defaultValues: {
			title: '',
		},
	});

	function onSubmit(values) {
		onAction({ ...values });
		reset();
	}

	React.useEffect(() => {
		if (data.id) {
			setValue('title', data.title);
		} else {
			reset();
		}
	}, [data]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				data-cy="form-add"
				minW="830px"
				minH="303px"
				borderRadius="12px"
			>
				<form data-cy={type === 'edit' ? 'detail-form' : 'form-add'} onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader
						data-cy={type === 'edit' ? 'detail-form' : 'form-add'}
						textStyle="h3"
						borderBottom={`1px solid #E5E5E5`}
						p={`30px 24px 19px`}
					>
						{type === 'edit' ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
					</ModalHeader>
					<ModalCloseButton
						data-cy="close-modal"
						top="25px"
						right="25px"
					/>

					<ModalBody p={`38px 30px 23px`}>
						<FormControl mb={26}>
							<FormLabel
								data-cy="modal-add-name-title"
								htmlFor="title"
								fontSize={'12px'}
								fontWeight={'semibold'}
							>
								Mata Kuliah
							</FormLabel>
							<Input
								data-cy="form-matkul"
								id="title"
								placeholder="Masukkan mata kuliah"
								{...register('title', {
									required: true,
								})}
								height="52px"
								p={`14px 18px`}
								fontSize={'16px'}
								border={`1px solid #E5E5E5`}
								focusBorderColor="prime.900"
								borderRadius={'6px'}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter
						borderTop={`1px solid #E5E5E5`}
						p={`15px 24px 19px`}
					>
						<Button
							data-cy="btn-submit"
							minW="150px"
							height="54px"
							bg={'prime.700'}
							color="white"
							borderRadius="45px"
							fontSize="18px"
							fontWeight="semibold"
							px="22px"
							py="13.5px"
							disabled={
								type === 'add' &&
								(!dirtyFields.title)
							}
							type="submit"
						>
							Simpan
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}