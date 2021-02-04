import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

  <SkeletonTheme color="#ddd" highlightColor="#444" />;
const SignupSkeleton = () => (
  <section className="bg-gray-100 p-6">
    <div className="bg-white rounded-2xl items-center content-center shadow-md p-6 sm:p-2">
      <div className="items-center md:m-6 md:p-6 xs:m-2 xs:p-2">
        <h3 className="text-primary-100 text-2xl content-center text-center mt-5"><Skeleton height={30} width={200} /></h3>
        <form className="content-center m-3 p-3 md:m-0.5 flex justify-center h-auto flex-col ">
          <div className="text-md content-center text-center m-2">
            <h2 className="text-gray-700 xs:text-xs"><Skeleton height={30} width={150} /></h2>
          </div>
          <div className="m-3 p-3 flex flex-col justify-center items-center">
            <Skeleton height={40} width={600} />
            <Skeleton height={40} width={600} />
            <Skeleton height={40} width={600} />
            <Skeleton height={40} width={600} />
            <Skeleton height={40} width={600} />
          </div>
        </form>
      </div>
    </div>
  </section>
);
export default SignupSkeleton;
