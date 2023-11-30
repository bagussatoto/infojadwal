import {
  Box,
  Button,
  Grid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IconPlus } from '../components/Icons/Icons';
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';
import { getAll, getDetail, store } from '../server api/schedule';
import { ModalFormAwal } from '../components/Modals/Modals';

export default function Dashboard() {
  const [dataSchedule, setDataSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailData, setDetailData] = useState({});

  const { isOpen: isOpenModalFormAwal, onOpen: onOpenModalFormAwal, onClose: onCloseModalFormAwal } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    getSchedule(storedEmail);
  }, []);

  const handleActionModalFormAwal = async (dataForm) => {
    onCloseModalFormAwal();
    try {
      const storedEmail = localStorage.getItem('email');
      await store(storedEmail, dataForm.day, dataForm.title);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const dayNames = {
    monday: 'Senin',
    tuesday: 'Selasa',
    wednesday: 'Rabu',
    thursday: 'Kamis',
    friday: 'Jumat',
  };

  const getSchedule = async (email) => {
    try {
      const { data } = await getAll(email);
      setDataSchedule(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getDetailSchedule = async (day) => {
    try {
      const storedEmail = localStorage.getItem('email');
      const { data } = await getDetail(storedEmail, day);
      const { data: todos, } = data;
      setDetailData((prevState) => ({ ...prevState, [day]: todos }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(dataSchedule).length > 0) {
      Object.keys(dataSchedule).forEach((day) => {
        getDetailSchedule(day);
      });
    }
  }, [dataSchedule]);

  return (
    <>
      <Box marginTop="43px" marginBottom="59px" display="flex" justifyContent="space-between">
        <Text data-cy="activity-title" textStyle="h1"></Text>
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
          leftIcon={<IconPlus />}
          onClick={onOpenModalFormAwal}
        >
          Buat Jadwal Kuliah
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <Spinner color="prime.900" size="lg" />
        </Box>
      ) : (
        <Grid
          templateColumns={Object.keys(dataSchedule).length > 0 ? `repeat(5, 1fr)` : '1fr'}
          rowGap="26px"
          columnGap="20px"
          marginBottom="50px"
        >
          {Object.keys(dataSchedule).map((day) => (
            <div key={day}>
              <Cards height="150px" marginBottom="20px" dataCy='card-day' handleclick={() => navigate(`/schedule/${day}`)}>
                <Text data-cy={`card-title-${dayNames[day]}`} textStyle="h3">
                  {dayNames[day]}
                </Text>
                <Box display="inline-flex" justifyContent="space-between" alignItems="center" bg="white">
                  <Text
                    data-cy={`card-desc-${dayNames[day]}`}
                    fontSize="14px"
                    fontWeight="medium"
                    color={dataSchedule[day] > 0 ? '#D9019C' : '#888888'}
                    cursor="text"
                  >
                    <p>
                      {dataSchedule[day] > 0 ? `${dataSchedule[day]} Mata Kuliah` : 'Belum ada mata kuliah'}
                    </p>
                  </Text>
                </Box>
              </Cards>
                {detailData[day] && detailData[day].length > 0 && (
					<Cards dataCy='card-day' padding="8px" maxHeight="900px">
						{detailData[day].map((item) => (
						<div key={item.id} style={{ backgroundColor: '#F8F8F8', borderRadius: '8px', padding: '10px', margin: '4px' }}>
							<Text>
							{item.title}
							</Text>
						</div>
						))}
					</Cards>
					)}

            </div>
          ))}
        </Grid>
      )}
      <ModalFormAwal isOpen={isOpenModalFormAwal} onClose={onCloseModalFormAwal} onAction={handleActionModalFormAwal} type="add" />
    </>
  );
}
