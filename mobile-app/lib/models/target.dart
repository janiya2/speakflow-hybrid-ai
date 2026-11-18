class TargetModel {
  final String id;
  final String title;
  final String description;
  final int dailyMinutesGoal;
  final int weeklyMinutesGoal;
  final int minDaysActive;
  final String rewardBadge;
  final int rewardPoints;
  final bool isActive;

  const TargetModel({
    required this.id,
    required this.title,
    required this.description,
    this.dailyMinutesGoal = 10,
    this.weeklyMinutesGoal = 60,
    this.minDaysActive = 5,
    this.rewardBadge = '🏆 Gold Fluency Champion',
    this.rewardPoints = 500,
    this.isActive = true,
  });

  factory TargetModel.fromFirestore(Map<String, dynamic> data, String id) {
    return TargetModel(
      id: id,
      title: data['title'] ?? 'Weekly Fluency Sprint',
      description: data['description'] ?? 'Speak daily and achieve natural fluency!',
      dailyMinutesGoal: (data['dailyMinutesGoal'] is num) ? (data['dailyMinutesGoal'] as num).toInt() : 10,
      weeklyMinutesGoal: (data['weeklyMinutesGoal'] is num) ? (data['weeklyMinutesGoal'] as num).toInt() : 60,
      minDaysActive: (data['minDaysActive'] is num) ? (data['minDaysActive'] as num).toInt() : 5,
      rewardBadge: data['rewardBadge'] ?? '🏆 Gold Fluency Champion',
      rewardPoints: (data['rewardPoints'] is num) ? (data['rewardPoints'] as num).toInt() : 500,
      isActive: data['isActive'] ?? true,
    );
  }

  static TargetModel get defaultWeeklyTarget => const TargetModel(
    id: 'default_weekly_sprint',
    title: 'Weekly Fluency Sprint',
    description: 'Practice speaking at least 10 minutes every day to unlock the Gold Fluency Champion Trophy!',
    dailyMinutesGoal: 10,
    weeklyMinutesGoal: 60,
    minDaysActive: 5,
    rewardBadge: '🏆 Gold Fluency Champion',
    rewardPoints: 500,
    isActive: true,
  );
}

