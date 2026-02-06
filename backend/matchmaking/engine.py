def compute_similarity(student_skills, alumni_skills):
    """
    Simple Jaccard similarity.
    """
    student_set = set(student_skills)
    alumni_set = set(alumni_skills)

    if not student_set or not alumni_set:
        return 0.0

    intersection = student_set.intersection(alumni_set)
    union = student_set.union(alumni_set)

    return len(intersection) / len(union)
