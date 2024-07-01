import Post from '@/components/Post/Post';
import EmployerTable from '@/components/Table/EmployerTable';

function EmptyApplicantsList() {
  return (
    <div className="flex flex-col gap-8px text-gray500 text-16px">
      신청자가 없습니다.
    </div>
  );
}

function ApplicantsList({ data }: { data: ApplicationListResponseData }) {
  return (
    <>
      <Post.Title text="신청자 목록" className="mb-8px" />

      <div className="[&_>div]:w-full">
        {data.count !== 0 ? (
          <EmployerTable data={data} />
        ) : (
          <EmptyApplicantsList />
        )}
      </div>
    </>
  );
}

export default ApplicantsList;
