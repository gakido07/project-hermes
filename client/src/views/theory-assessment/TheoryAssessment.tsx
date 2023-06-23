import { NestedHomeLayout } from '@projecthermes/client/components/layouts/nested-home-layout/NestedHomeLayout';
import { AssessmentView } from '@projecthermes/client/features/assessment/assessment-view/AssessmentView';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '@projecthermes/client/config/api';
import { AssessmentSkeleton } from '@projecthermes/client/features/assessment/assessment-skeleton/AssessmentSkeleton';
import { Back } from '@projecthermes/client/components/back/Back';

export function TheoryAssessment() {
  const { id } = useParams();
  const { data: response } = useQuery({
    queryFn: () => api.getAssessmentById(id),
    queryKey: ['Assessment'],
  });
  return (
    <NestedHomeLayout>
      <Back />
      {response?.data ? (
        <AssessmentView assessment={response?.data} />
      ) : (
        <AssessmentSkeleton />
      )}
    </NestedHomeLayout>
  );
}
