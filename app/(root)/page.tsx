import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>
            Get Interview-Ready with Our AI-Powered Mock Interviews & Feedback
          </h2>
          <p className="text-lg">
            Practice on real interview questions and get personalized feedback
            from our AI.
            {/* Our platform is designed to help you ace your next interview with confidence. */}
          </p>

          <Button asChild className="btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden"/>
      </section>

      {/* other section */}
      <section className="flex flex-col gap-6 mt-8">
  <h2>Your Interviews</h2>
  <div className="interviews-section">
{dummyInterviews.map((interview) => (
  <InterviewCard {...interview} key={interview.id}/>
))}

  </div>
      </section>

      {/* third section */}
      <section className="flex flex-col gap-6 mt-6">
 <h2>Take an Interview</h2>
      
      <div className="interviews-section">
<p>There are no interviews available</p>
      </div>
      </section>
    </>
  );
};

export default page;
