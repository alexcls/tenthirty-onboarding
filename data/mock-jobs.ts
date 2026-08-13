import type { OnboardingAnswers } from "@/types/onboarding";

export type MockJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  roleTags: string[];
  seniorityTags: string[];
  baseMatchScore: number;
};

const jobs: MockJob[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "NovaFlow",
    location: "Berlin",
    remote: true,
    salaryMin: 70000,
    salaryMax: 90000,
    roleTags: ["frontend", "fullstack"],
    seniorityTags: ["senior", "lead-staff"],
    baseMatchScore: 91,
  },
  {
    id: "job-2",
    title: "Full-Stack TypeScript Developer",
    company: "CloudForge",
    location: "München",
    remote: true,
    salaryMin: 65000,
    salaryMax: 85000,
    roleTags: ["fullstack", "frontend", "backend"],
    seniorityTags: ["mid", "senior"],
    baseMatchScore: 88,
  },
  {
    id: "job-3",
    title: "Backend Engineer (Node.js)",
    company: "ByteWerk",
    location: "Hamburg",
    remote: false,
    salaryMin: 60000,
    salaryMax: 82000,
    roleTags: ["backend", "fullstack"],
    seniorityTags: ["mid", "senior"],
    baseMatchScore: 84,
  },
  {
    id: "job-4",
    title: "Mobile Engineer (Flutter)",
    company: "MoveMint",
    location: "Köln",
    remote: true,
    salaryMin: 58000,
    salaryMax: 78000,
    roleTags: ["mobile"],
    seniorityTags: ["mid", "senior"],
    baseMatchScore: 82,
  },
  {
    id: "job-5",
    title: "ML Engineer",
    company: "DataNexus",
    location: "Stuttgart",
    remote: true,
    salaryMin: 68000,
    salaryMax: 98000,
    roleTags: ["data-ml"],
    seniorityTags: ["mid", "senior", "lead-staff"],
    baseMatchScore: 89,
  },
  {
    id: "job-6",
    title: "DevOps Engineer",
    company: "OpsPilot",
    location: "Frankfurt am Main",
    remote: true,
    salaryMin: 64000,
    salaryMax: 92000,
    roleTags: ["devops", "backend"],
    seniorityTags: ["mid", "senior", "lead-staff"],
    baseMatchScore: 86,
  },
  {
    id: "job-7",
    title: "Junior Frontend Developer",
    company: "PixelSprint",
    location: "Leipzig",
    remote: false,
    salaryMin: 42000,
    salaryMax: 56000,
    roleTags: ["frontend"],
    seniorityTags: ["junior"],
    baseMatchScore: 78,
  },
  {
    id: "job-8",
    title: "Software Engineer (Generalist)",
    company: "BlueHarbor",
    location: "Düsseldorf",
    remote: true,
    salaryMin: 55000,
    salaryMax: 75000,
    roleTags: ["frontend", "backend", "fullstack"],
    seniorityTags: ["mid"],
    baseMatchScore: 80,
  },
];

function calculateMatchScore(job: MockJob, answers: OnboardingAnswers) {
  let score = job.baseMatchScore;
  const role = typeof answers.role === "string" ? answers.role : undefined;
  const seniority =
    typeof answers.seniority === "string" ? answers.seniority : undefined;
  const remote =
    typeof answers.locationRemote === "boolean" ? answers.locationRemote : true;
  const salary =
    typeof answers.salary === "number" ? answers.salary : undefined;

  if (role && job.roleTags.includes(role)) {
    score += 4;
  }

  if (seniority && job.seniorityTags.includes(seniority)) {
    score += 3;
  }

  if (remote && job.remote) {
    score += 1;
  }

  if (salary && salary <= job.salaryMax) {
    score += 2;
  }

  return Math.min(99, score);
}

export function getPersonalizedJobs(answers: OnboardingAnswers) {
  const role = typeof answers.role === "string" ? answers.role : undefined;
  const seniority =
    typeof answers.seniority === "string" ? answers.seniority : undefined;
  const city =
    typeof answers.location === "string" && answers.location.trim().length > 0
      ? answers.location.trim()
      : undefined;
  const remote =
    typeof answers.locationRemote === "boolean" ? answers.locationRemote : true;
  const salary =
    typeof answers.salary === "number" ? answers.salary : undefined;

  const filtered = jobs
    .filter((job) => {
      if (role && !job.roleTags.includes(role)) {
        return false;
      }

      if (seniority && !job.seniorityTags.includes(seniority)) {
        return false;
      }

      if (salary && job.salaryMax < salary) {
        return false;
      }

      if (!remote && city) {
        return job.location.toLowerCase().includes(city.toLowerCase());
      }

      if (city && !remote) {
        return job.location.toLowerCase().includes(city.toLowerCase());
      }

      return true;
    })
    .map((job) => ({
      ...job,
      matchScore: calculateMatchScore(job, answers),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return filtered.length > 0
    ? filtered
    : jobs.map((job) => ({
        ...job,
        matchScore: calculateMatchScore(job, answers),
      }));
}

export function getTotalMatches(answers: OnboardingAnswers) {
  const personalized = getPersonalizedJobs(answers);
  return Math.max(34, personalized.length + 31);
}
