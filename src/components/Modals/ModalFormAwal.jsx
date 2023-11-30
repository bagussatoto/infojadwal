import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { dayList as dataDay } from '../../data/data-day';
import { IconArrowDown } from '../Icons/Icons';

export function ModalFormAwal({ isOpen, onClose, onAction, type }) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { dirtyFields },
		control,
	} = useForm({
		defaultValues: {
			title: '',
			day: '',
		},
	});

	function onSubmit(values) {
		onAction({ ...values });
		reset();
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				data-cy="form-add"
				minW="830px"
				minH="403px"
				borderRadius="12px"
			>
				<form data-cy="form-add" onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader
						data-cy="modal-add-title"
						textStyle="h3"
						borderBottom={`1px solid #E5E5E5`}
						p={`30px 24px 19px`}
					>
						Buat Jadwal Kuliah
					</ModalHeader>
					<ModalCloseButton
						data-cy="close-modal"
						top="25px"
						right="25px"
					/>

					<ModalBody data-cy="detail-form" p={`38px 30px 23px`}>
						<FormControl mb={26}>
							<FormLabel
								htmlFor="title"
								fontSize={'12px'}
								fontWeight={'semibold'}
							>
								Mata Kuliah
							</FormLabel>
							<Input
								data-cy="form-matkul"
								id="title"
								placeholder="Masukkan Mata Kuliah"
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
						<FormControl width={'205px'}>
							<FormLabel
								htmlFor="priority"
								fontSize={'12px'}
								fontWeight={'semibold'}
							>
								Pilih Hari
							</FormLabel>
							<Controller
							    data-cy="form-day"
								name="day"
								control={control}
								render={({
									field: { onChange, name, value },
								}) => (
									<Menu>
										<MenuButton
											data-cy="form-day"
											as={Button}
											rightIcon={<IconArrowDown />}
											id="day"
											bg="white"
											width="224px"
											height="52px"
											p={`14px 17px`}
											fontSize={'16px'}
											fontWeight="normal"
											border={`1px solid #E5E5E5`}
											borderRadius={'6px'}
											gap={'65px'}
											_expanded={{
												bg: 'white',
												borderColor: 'prime.900',
											}}
										>
											{value === '' ? (
												'Pilih hari'
											) : (
												<Box
													display={'inline-flex'}
													alignItems={'center'}
													gap={'19px'}
												>
													<Text
														as="span"
														display="inline-block"
														width="14px"
														height="14px"
														borderRadius="14px"
														backgroundColor={
															dataDay.find(
																(day) =>
																	day.key ===
																	value
															).color
														}
													></Text>
													<Text
														fontSize={'16px'}
														fontWeight={'normal'}
													>
														{
															dataDay.find(
																(day) =>
																	day.key ===
																	value
															).label
														}
													</Text>
												</Box>
											)}
										</MenuButton>
										<MenuList>
											{dataDay.map((day, i) => (
												<MenuItem
													data-cy="form-day"
													key={i}
													display="flex"
													justifyContent="space-between"
													alignItems="center"
													px="17px"
													py="14px"
													onClick={(_) => {
														onChange(day.key);
													}}
												>
													<Box
														display="flex"
														alignItems="center"
														gap="19px"
													>
														<Text
															as="span"
															display="inline-block"
															width="14px"
															height="14px"
															borderRadius="14px"
															backgroundColor={
																day.color
															}
														></Text>
														<Text
															fontSize={'16px'}
															fontWeight={
																'normal'
															}
														>
															{day.label}
														</Text>
													</Box>
													{day.key === value && (
														<Image src="/static/icons/checked.svg" />
													)}
												</MenuItem>
											))}
										</MenuList>
									</Menu>
								)}
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
							bg={'prime.900'}
							color="white"
							borderRadius="45px"
							fontSize="18px"
							fontWeight="semibold"
							px="22px"
							py="13.5px"
							disabled={!dirtyFields.title || !dirtyFields.day}
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