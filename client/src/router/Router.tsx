import { Route, Routes } from 'react-router-dom';
import { Auth } from '@projecthermes/client/views/auth/Auth';
import { TheoryAssessments } from '@projecthermes/client/views/theory-assessments/TheoryAssessments';
import { Home } from '@projecthermes/client/views/home/Home';
import { ROUTES } from '@projecthermes/client/common/constants';
import { CreateTheoryAssessment } from '@projecthermes/client/views/create-theory-assessment/CreateTheoryAssessment';
import { ProtectedRoute } from '@projecthermes/client/components/common/ProtectedRoute';
import { TheoryAssessment } from '@projecthermes/client/views/theory-assessment/TheoryAssessment';
import { AssessmentPortalView } from '@projecthermes/client/views/assessment-portal/AssessmentPortal';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />}>
        <Route
          path="/home/theory-assessments"
          element={<ProtectedRoute element={<TheoryAssessments />} />}
        />
        <Route
          path={ROUTES.CREATE_ASSESSMENT}
          element={<ProtectedRoute element={<CreateTheoryAssessment />} />}
        />
        <Route
          path={ROUTES.ASSESSMENT_PAGE_ID}
          element={<ProtectedRoute element={<TheoryAssessment />} />}
        />
      </Route>
      <Route
        path={ROUTES.ASSESSMENT_PORTAL}
        element={<ProtectedRoute element={<AssessmentPortalView />} />}
      />
    </Routes>
  );
}
