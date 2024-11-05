$(document).ready(function () {
  $(document).ready(function () {
    $(".Info_Index_List").css("opacity", "0.3"); // 초기 투명도 설정

    $(".Info_Index_List").on("mouseover", function () {
      $(this).css("opacity", "1"); // 마우스를 올렸을 때 투명도 100%
    });

    $(".Info_Index_List").on("mouseout", function () {
      $(this).css("opacity", "0.3"); // 마우스를 뗐을 때 투명도 30%
    });
  });

  $("#BTN_Overview").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#Overview").offset().top,
      },
      800
    );
  });

  $("#BTN_Records").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#Records").offset().top,
      },
      800
    );
  });

  $("#BTN_Stats").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#Stats").offset().top,
      },
      800
    );
  });

  $("#BTN_Quote").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#Quote").offset().top,
      },
      800
    );
  });

  $(".Info_hover_area_1").hover(
    function () {
      // 이미지 변경 전에 서서히 사라지게 함
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        // 0.5초 후에 이미지 변경 및 서서히 나타나게 함
        $("#overview_img_container")
          .attr("src", "img/overview_img1.png")
          .removeClass("fade-out");
      }, 500);
    },
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_main_img.png")
          .removeClass("fade-out");
      }, 500);
    }
  );

  $(".Info_hover_area_2").hover(
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_img2.png")
          .removeClass("fade-out");
      }, 500);
    },
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_main_img.png")
          .removeClass("fade-out");
      }, 500);
    }
  );

  $(".Info_hover_area_3").hover(
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_img3.png")
          .removeClass("fade-out");
      }, 500);
    },
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_main_img.png")
          .removeClass("fade-out");
      }, 500);
    }
  );

  $(".Info_hover_area_4").hover(
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_img4.png")
          .removeClass("fade-out");
      }, 500);
    },
    function () {
      $("#overview_img_container").addClass("fade-out");
      setTimeout(function () {
        $("#overview_img_container")
          .attr("src", "img/overview_main_img.png")
          .removeClass("fade-out");
      }, 500);
    }
  );
  // info 페이지 스크립트

  // records 페이지 스크립트

  //하이차트 시작

  // 연도별 데이터
  const playerData = {
    2021: [63.3, 4.0, 5.8, 353, 68.9, 45, 51.7, 1.56],
    2022: [74.3, 5, 5.8, 366, 71, 42.4, 65.3, 1.44],
    2023: [63.2, 3.9, 5.5, 351, 75.7, 42.1, 53, 1.85],
    2024: [63.8, 4.1, 6.4, 360, 69.9, 31, 65.8, 1.65],
  };

  // 지표별 데이터를 배열로 구성
  const metricsData = playerData[2021].map((_, i) => [
    playerData[2021][i],
    playerData[2022][i],
    playerData[2023][i],
    playerData[2024][i],
  ]);

  // 평균과 표준편차 계산 함수
  function calculateMean(data) {
    return data.reduce((a, b) => a + b, 0) / data.length;
  }

  function calculateStandardDeviation(data, mean) {
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;
    return Math.sqrt(variance);
  }

  // Z-점수를 스코어로 변환하는 함수
  function calculateScore(zScore) {
    const score = 5.0 + zScore * 2.0;
    return Math.max(0, Math.min(10, score)); // 0과 10 사이로 제한
  }

  // Z-점수로 변환된 연도별 데이터 저장
  const scoreData = {
    2021: [],
    2022: [],
    2023: [],
    2024: [],
  };

  // 각 지표별 평균과 표준편차 계산 및 Z-점수 변환 후 스코어 적용
  metricsData.forEach((data, index) => {
    const mean = calculateMean(data);
    const stdDev = calculateStandardDeviation(data, mean);

    scoreData[2021].push(
      calculateScore((playerData[2021][index] - mean) / stdDev)
    );
    scoreData[2022].push(
      calculateScore((playerData[2022][index] - mean) / stdDev)
    );
    scoreData[2023].push(
      calculateScore((playerData[2023][index] - mean) / stdDev)
    );
    scoreData[2024].push(
      calculateScore((playerData[2024][index] - mean) / stdDev)
    );
  });

  // Highcharts 차트 생성
  Highcharts.chart("Statistics_1", {
    chart: {
      polar: true,
      backgroundColor: "#252525",
    },

    title: {
      text: "2021 - 2024 Oner 선수 연도별 통산 스탯 비교",
      style: {
        color: "#F4F2EF", // 제목 글자색 설정
        fontSize: "20px",
      },
    },

    legend: {
      itemStyle: {
        color: "#F4F2EF", // 범례 글자색 설정
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#E4012C", // 범례 항목에 마우스를 올렸을 때 글자색 설정
      },
    },

    subtitle: {
      text: "Z-점수 정규화를 기반으로 한 점수",
      style: {
        color: "#F4F2EF", // 부제목 글자색 설정
        fontSize: "14px",
      },
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: {
        backgroundColor: "#ffffff", // 차트 내부 배경색 설정
      },
    },

    xAxis: {
      tickInterval: 45,
      min: 0,
      max: 360,
      labels: {
        style: {
          color: "#F4F2EF", // x축 레이블 글자색 설정
        },
        formatter: function () {
          const labels = [
            "승률",
            "KDA",
            "분당 CS",
            "분당 골드",
            "킬 관여율",
            "퍼블 관여율",
            "15분 CS 우세 확률",
            "분당 시야점수",
          ];
          return labels[this.pos / 45];
        },
      },
    },

    yAxis: {
      min: 0,
      max: 10, // 0-10 범위 설정
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },

    tooltip: {
      formatter: function () {
        const labels = [
          "승률",
          "KDA",
          "분당 CS",
          "분당 골드",
          "킬 관여율",
          "퍼블 관여율",
          "15분 CS 우세 확률",
          "분당 시야점수",
        ];
        return (
          "<b>" +
          this.series.name +
          "</b><br>" +
          labels[this.point.index] +
          ": " +
          this.y.toFixed(2)
        );
      },
    },

    series: [
      {
        type: "area",
        name: "2021",
        data: scoreData[2021],
      },
      {
        type: "area",
        name: "2022",
        data: scoreData[2022],
      },
      {
        type: "area",
        name: "2023",
        data: scoreData[2023],
      },
      {
        type: "area",
        name: "2024",
        data: scoreData[2024],
      },
    ],
  });

  // 선수별 데이터
  const playerStats = {
    Oner: [66.4, 4.2, 5.9, 358, 71.7, 38.9, 60.1, 1.64],
    Canyon: [67.8, 4.6, 5.9, 350, 70.3, 33.5, 57.7, 1.66],
    Peanut: [63, 4.6, 5.6, 351, 70.6, 37.5, 54.7, 1.87],
    Lucid: [58.6, 4.2, 5.6, 342, 71.5, 36.2, 54.3, 1.58],
  };

  // 지표별 데이터를 배열로 구성
  const statMetrics = playerStats.Oner.map((_, i) => [
    playerStats.Oner[i],
    playerStats.Canyon[i],
    playerStats.Peanut[i],
    playerStats.Lucid[i],
  ]);

  // 평균과 표준편차 계산 함수
  function calculateMean(data) {
    return data.reduce((a, b) => a + b, 0) / data.length;
  }

  function calculateStandardDeviation(data, mean) {
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;
    return Math.sqrt(variance);
  }

  // Z-점수를 스코어로 변환하는 함수
  function calculateScore(zScore) {
    const score = 5.0 + zScore * 2.0;
    return Math.max(0, Math.min(10, score)); // 0과 10 사이로 제한
  }

  // Z-점수로 변환된 선수별 데이터 저장
  const normalizedScores = {
    Oner: [],
    Canyon: [],
    Peanut: [],
    Lucid: [],
  };

  // 각 지표별 평균과 표준편차 계산 및 Z-점수 변환 후 스코어 적용
  statMetrics.forEach((data, index) => {
    const mean = calculateMean(data);
    const stdDev = calculateStandardDeviation(data, mean);

    normalizedScores.Oner.push(
      calculateScore((playerStats.Oner[index] - mean) / stdDev)
    );
    normalizedScores.Canyon.push(
      calculateScore((playerStats.Canyon[index] - mean) / stdDev)
    );
    normalizedScores.Peanut.push(
      calculateScore((playerStats.Peanut[index] - mean) / stdDev)
    );
    normalizedScores.Lucid.push(
      calculateScore((playerStats.Lucid[index] - mean) / stdDev)
    );
  });

  // Highcharts 차트 생성
  Highcharts.chart("Statistics_2", {
    chart: {
      polar: true,
      backgroundColor: "#252525",
    },

    title: {
      text: "Oner, Canyon, Peanut, Lucid 선수 통산 스탯 비교",
      style: {
        color: "#F4F2EF", // 제목 글자색 설정
        fontSize: "20px",
      },
    },

    legend: {
      itemStyle: {
        color: "#F4F2EF", // 범례 글자색 설정
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#E4012C", // 범례 항목에 마우스를 올렸을 때 글자색 설정
      },
    },

    subtitle: {
      text: "Z-점수 정규화를 기반으로 한 점수",
      style: {
        color: "#F4F2EF", // 부제목 글자색 설정
        fontSize: "14px",
      },
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: {
        backgroundColor: "#ffffff", // 차트 내부 배경색 설정
      },
    },

    xAxis: {
      tickInterval: 45,
      min: 0,
      max: 360,
      labels: {
        style: {
          color: "#F4F2EF", // x축 레이블 글자색 설정
        },
        formatter: function () {
          const labels = [
            "승률",
            "KDA",
            "분당 CS",
            "분당 골드",
            "킬 관여율",
            "퍼블 관여율",
            "15분 CS 우세 확률",
            "분당 시야점수",
          ];
          return labels[this.pos / 45];
        },
      },
    },

    yAxis: {
      min: 0,
      max: 10, // 0-10 범위 설정
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },

    tooltip: {
      formatter: function () {
        const labels = [
          "승률",
          "KDA",
          "분당 CS",
          "분당 골드",
          "킬 관여율",
          "퍼블 관여율",
          "15분 CS 우세 확률",
          "분당 시야점수",
        ];
        return (
          "<b>" +
          this.series.name +
          "</b><br>" +
          labels[this.point.index] +
          ": " +
          this.y.toFixed(2)
        );
      },
    },

    series: [
      {
        type: "area",
        name: "Oner",
        data: normalizedScores.Oner,
      },
      {
        type: "area",
        name: "Canyon",
        data: normalizedScores.Canyon,
      },
      {
        type: "area",
        name: "Peanut",
        data: normalizedScores.Peanut,
      },
      {
        type: "area",
        name: "Lucid",
        data: normalizedScores.Lucid,
      },
    ],
  });

  // 선수별 데이터
  const teamPlayerStats = {
    Zeus: [66.8, 3.1, 8.3, 408, 57.9, 15.9, 67.1, 1.07],
    Oner: [66.4, 4.2, 5.9, 358, 71.7, 38.9, 60.1, 1.64],
    Faker: [67.1, 4.1, 8.9, 413, 64.5, 19.8, 56.9, 1.23],
    Gumayusi: [65.6, 4.8, 9.5, 455, 66.7, 22.5, 65.8, 1.45],
    Keria: [64.8, 4.2, 1.5, 257, 70.2, 26.6, 51.8, 2.85],
  };

  // 지표별 데이터를 배열로 구성
  const teamStatMetrics = teamPlayerStats.Zeus.map((_, i) => [
    teamPlayerStats.Zeus[i],
    teamPlayerStats.Oner[i],
    teamPlayerStats.Faker[i],
    teamPlayerStats.Gumayusi[i],
    teamPlayerStats.Keria[i],
  ]);

  // 평균과 표준편차 계산 함수
  function calculateMean(data) {
    return data.reduce((a, b) => a + b, 0) / data.length;
  }

  function calculateStandardDeviation(data, mean) {
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;
    return Math.sqrt(variance);
  }

  // Z-점수를 스코어로 변환하는 함수
  function calculateScore(zScore) {
    const score = 5.0 + zScore * 2.0;
    return Math.max(0, Math.min(10, score)); // 0과 10 사이로 제한
  }

  // Z-점수로 변환된 선수별 데이터 저장
  const teamNormalizedScores = {
    Zeus: [],
    Oner: [],
    Faker: [],
    Gumayusi: [],
    Keria: [],
  };

  // 각 지표별 평균과 표준편차 계산 및 Z-점수 변환 후 스코어 적용
  teamStatMetrics.forEach((data, index) => {
    const mean = calculateMean(data);
    const stdDev = calculateStandardDeviation(data, mean);

    teamNormalizedScores.Zeus.push(
      calculateScore((teamPlayerStats.Zeus[index] - mean) / stdDev)
    );
    teamNormalizedScores.Oner.push(
      calculateScore((teamPlayerStats.Oner[index] - mean) / stdDev)
    );
    teamNormalizedScores.Faker.push(
      calculateScore((teamPlayerStats.Faker[index] - mean) / stdDev)
    );
    teamNormalizedScores.Gumayusi.push(
      calculateScore((teamPlayerStats.Gumayusi[index] - mean) / stdDev)
    );
    teamNormalizedScores.Keria.push(
      calculateScore((teamPlayerStats.Keria[index] - mean) / stdDev)
    );
  });

  // Highcharts 차트 생성
  Highcharts.chart("Statistics_3", {
    chart: {
      polar: true,
      backgroundColor: "#252525",
    },

    title: {
      text: "Zeus, Oner, Faker, Gumayusi, Keria 선수 통산 스탯 비교",
      style: {
        color: "#F4F2EF", // 제목 글자색 설정
        fontSize: "20px",
      },
    },

    legend: {
      itemStyle: {
        color: "#F4F2EF", // 범례 글자색 설정
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#E4012C", // 범례 항목에 마우스를 올렸을 때 글자색 설정
      },
    },

    subtitle: {
      text: "Z-점수 정규화를 기반으로 한 점수",
      style: {
        color: "#F4F2EF", // 부제목 글자색 설정
        fontSize: "14px",
      },
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: {
        backgroundColor: "#ffffff", // 차트 내부 배경색 설정
      },
    },

    xAxis: {
      tickInterval: 45,
      min: 0,
      max: 360,
      labels: {
        style: {
          color: "#F4F2EF", // x축 레이블 글자색 설정
        },
        formatter: function () {
          const labels = [
            "승률",
            "KDA",
            "분당 CS",
            "분당 골드",
            "킬 관여율",
            "퍼블 관여율",
            "15분 CS 우세 확률",
            "분당 시야점수",
          ];
          return labels[this.pos / 45];
        },
      },
    },

    yAxis: {
      min: 0,
      max: 10, // 0-10 범위 설정
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },

    tooltip: {
      formatter: function () {
        const labels = [
          "승률",
          "KDA",
          "분당 CS",
          "분당 골드",
          "킬 관여율",
          "퍼블 관여율",
          "15분 CS 우세 확률",
          "분당 시야점수",
        ];
        return (
          "<b>" +
          this.series.name +
          "</b><br>" +
          labels[this.point.index] +
          ": " +
          this.y.toFixed(2)
        );
      },
    },

    series: [
      {
        type: "area",
        name: "Zeus",
        data: teamNormalizedScores.Zeus,
      },
      {
        type: "area",
        name: "Oner",
        data: teamNormalizedScores.Oner,
      },
      {
        type: "area",
        name: "Faker",
        data: teamNormalizedScores.Faker,
      },
      {
        type: "area",
        name: "Gumayusi",
        data: teamNormalizedScores.Gumayusi,
      },
      {
        type: "area",
        name: "Keria",
        data: teamNormalizedScores.Keria,
      },
    ],
  });
});
