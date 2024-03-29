/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Tooltip, IconButton, Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { RHFTextField, FormProvider } from '../../components/hook-form';
import CreateUserForm from '../../components/user/CreateUserForm';
import { ServiceTypeSchema } from '../../yup-schema/serviceTypeSchema';
// api
import communityServiceTypesApi from '../../service/communityServiceTypesApi';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '60%',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: -50,
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ViewCommunityServiceTypes() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { updateCommunityServicesTypes } = communityServiceTypesApi;
  const { serviceType } = useSelector((store) => store.serviceTypes);

  const methods = useForm({
    resolver: yupResolver(ServiceTypeSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const setUserHandler = useCallback(() => {
    const { service_name, discount, time_to_render } = serviceType;

    reset({
      serviceName: service_name,
      discount,
      timeToRender: time_to_render,
    });
  }, [serviceType]);

  useEffect(() => {
    setUserHandler();
  }, [setUserHandler]);

  const { mutate: Update, isLoading: isLoad } = useMutation(
    (payload) => updateCommunityServicesTypes(serviceType.id, payload),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['get-all-service-types']);
        toast.success('Updated successfully');
        setIsLoading(true);
        navigate(-1);
      },
      onError: (data) => {
        console.log(data);
        toast.error(data.response.data.message);
        setIsLoading(false);
      },
    }
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      service_name: data.serviceName,
      discount: data.discount,
      time_to_render: data.timeToRender,
    };
    await Update(payload);
  };

  return (
    <Page title="Community Service Types">
      <Container>
        <ContentStyle>
          <div style={{ padding: 5, zIndex: 9999 }}>
            <Tooltip title="View">
              <IconButton onClick={() => navigate(-1)}>
                <Iconify icon="ion:arrow-back-circle" sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Tooltip>
            <Typography variant="h4" gutterBottom sx={{ mb: 2, alignSelf: 'flex-end' }}>
              Updating Community Service
            </Typography>
          </div>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={{ xs: 'column' }} spacing={2}>
              <RHFTextField name="serviceName" label="Service Name" />
              <RHFTextField name="discount" label="Discount(%)" />
              <RHFTextField name="timeToRender" label="Time to Render(hours)" />
            </Stack>
            <Stack direction="row" spacing={4} sx={{ marginTop: 10 }}>
              <Box width="100%">
                <LoadingButton fullWidth size="large" variant="contained" loading={isLoading} type="submit">
                  Create
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </ContentStyle>
      </Container>
    </Page>
  );
}
