import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function TodoItem({
	dataCy,
	id: idTodo,
	title,
	day,
	handleDelete,
	handleEdit,
}) {
	return (
		<Box
			height="80px"
			bg="#FFFFFF"
			boxShadow={`0px 6px 10px rgba(0, 0, 0, .1)`}
			borderRadius="12px"
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			p="28px"
			mb="10px"
		>
			<Box display="flex" gap="16px" alignItems="center">
				<Text
					data-cy="card-item-title"
					textStyle="h3"
					fontWeight="medium"
				>
					{title}
				</Text>
				
			</Box>
			<Box display="flex" gap="16px" alignItems="center">
				<Image
						data-cy="card-item-edit"
						src="/static/icons/todo-title-edit-button.svg"
						alt="todo-item-edit-button"
						width="20px"
						opacity={0.6}
						cursor="pointer"
						onClick={handleEdit}
					/>
				<Image
					data-cy="card-item-delete"
					src="/static/icons/delete.svg"
					alt="todo-item-delete-button"
					cursor="pointer"
					onClick={() =>
						handleDelete({
							id: idTodo,
							title,
							day,
						})
					}
				/>
			</Box>
		</Box>
	);
}
