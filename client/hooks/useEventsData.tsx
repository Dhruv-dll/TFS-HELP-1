import { useState, useEffect, useMemo } from "react";

interface EventItem {
  title: string;
  description?: string;
}

interface EventDetails {
  id: string;
  title: string;
  events?: EventItem[];
  comingSoon?: boolean;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
  };
}

interface EventsConfig {
  pastEvents: {
    [key: string]: {
      events?: EventItem[];
      comingSoon?: boolean;
    };
  };
  upcomingEvents: UpcomingEvent[];
}

const defaultConfig: EventsConfig = {
  pastEvents: {
    "saturday-sessions": { events: [], comingSoon: false },
    "networking-events": { comingSoon: true },
    "flagship-event": { comingSoon: true },
  },
  upcomingEvents: [],
};

export function useEventsData() {
  const [config, setConfig] = useState<EventsConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/data/events.json");
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (error) {
        console.warn("Failed to load events:", error);
        setConfig(defaultConfig);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const getTitleFromId = (id: string): string => {
    const titleMap: { [key: string]: string } = {
      "saturday-sessions": "Saturday Sessions",
      "networking-events": "Networking Events",
      "flagship-event": "Flagship Conclave",
    };
    return titleMap[id] || id;
  };

  const eventDetails = useMemo((): EventDetails[] => {
    return Object.entries(config.pastEvents).map(([id, eventConfig]) => ({
      id,
      title: getTitleFromId(id),
      events: eventConfig.events,
      comingSoon: eventConfig.comingSoon,
    }));
  }, [config.pastEvents]);

  const sortedUpcomingEvents = useMemo((): UpcomingEvent[] => {
    return [...config.upcomingEvents].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA.getTime() === dateB.getTime()) {
        const timeA = parseTimeString(a.time);
        const timeB = parseTimeString(b.time);
        return timeA - timeB;
      }

      return dateA.getTime() - dateB.getTime();
    });
  }, [config.upcomingEvents]);

  const parseTimeString = (timeStr: string): number => {
    try {
      const cleanTime = timeStr.toLowerCase().trim();

      if (cleanTime.includes("am") || cleanTime.includes("pm")) {
        const [time, period] = cleanTime.split(/\s+/);
        const [hours, minutes = "0"] = time.split(":").map(Number);

        let hour24 = hours;
        if (period.includes("pm") && hours !== 12) {
          hour24 += 12;
        } else if (period.includes("am") && hours === 12) {
          hour24 = 0;
        }

        return hour24 * 60 + minutes;
      }

      const [hours, minutes = "0"] = cleanTime.split(":").map(Number);
      return hours * 60 + minutes;
    } catch (error) {
      console.warn(`Failed to parse time string: ${timeStr}`);
      return 0;
    }
  };

  return {
    loading,
    eventDetails,
    upcomingEvents: sortedUpcomingEvents,
    rawConfig: config,
  };
}
