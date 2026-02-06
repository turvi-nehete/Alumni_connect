def recommend_jobs(student_skills, jobs):
    recommendations = []

    student_skill_ids = set(student_skills.values_list("id", flat=True))

    for job in jobs:
        job_skill_ids = set(job.skills.values_list("id", flat=True))
        overlap = student_skill_ids.intersection(job_skill_ids)

        score = len(overlap) / max(len(job_skill_ids), 1)

        if score > 0:
            recommendations.append((job, score))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    return [job for job, score in recommendations]
