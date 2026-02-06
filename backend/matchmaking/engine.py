def compute_similarity(student_skill_ids, alumni_skill_ids):
    """
    Jaccard similarity between two skill ID sets.
    """
    student_set = set(student_skill_ids)
    alumni_set = set(alumni_skill_ids)

    if not student_set or not alumni_set:
        return 0.0

    intersection = student_set.intersection(alumni_set)
    union = student_set.union(alumni_set)

    return len(intersection) / len(union)
