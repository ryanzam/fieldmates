import { Button } from '@/components/ui/button'
import { locationService } from '@/services/mongodb/location'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Radio, Circle, Layers, RefreshCw, Loader2, AlertCircle, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'
import type { TeamMember } from '@/types/mongodb'
import { getTimeAgo } from '@/utils'

const Live = () => {

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showGeofences, setShowGeofences] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const fetchData = async () => {
    const location = await locationService.getAll()
  }

  const statusCounts = {
    active: teamMembers.filter(m => m.status === 'active').length,
    idle: teamMembers.filter(m => m.status === 'idle').length,
    offline: teamMembers.filter(m => m.status === 'offline').length
  };

  const filteredMembers = statusFilter
    ? teamMembers.filter(m => m.status === statusFilter)
    : teamMembers;


  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className='cursor-pointer'>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Realtime</h1>
            </div>
            <Badge variant="outline" className="gap-1.5 text-xs border-primary-dark">
              <Radio className="h-3 w-3 text-green-500 animate-pulse" />
              Live
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Status filters */}
            <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
              <Button
                variant={statusFilter === null ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setStatusFilter(null)}
              >
                All ({teamMembers.length})
              </Button>
              <Button
                variant={statusFilter === 'active' ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setStatusFilter('active')}
              >
                <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                Active ({statusCounts.active})
              </Button>
              <Button
                variant={statusFilter === 'idle' ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setStatusFilter('idle')}
              >
                <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
                Idle ({statusCounts.idle})
              </Button>
              <Button
                variant={statusFilter === 'offline' ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setStatusFilter('offline')}
              >
                <Circle className="h-2 w-2 fill-muted-foreground text-muted-foreground" />
                Offline ({statusCounts.offline})
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-none cursor-pointer"
              //onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading team locations...</p>
          </div>
        </div>
      )}

      {/* Main content */}
      {!isLoading && !error && (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:flex flex-col w-80 border-r border-border bg-background overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Members
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {filteredMembers.length}
                </Badge>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredMembers.map((member) => {
                const memberId = member._id || '';
                const speed = member.location.speed || 0;
                const battery = member.batteryLevel || 0;

                return (
                  <motion.button
                    key={memberId}
                    onClick={() => setSelectedMember(memberId === selectedMember ? null : memberId)}
                    className={`w-full text-left p-4 border-b border-border hover:bg-secondary/50 transition-colors ${selectedMember === memberId ? 'bg-secondary' : ''
                      }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background ${member.status === 'active' ? 'bg-green-500' :
                              member.status === 'idle' ? 'bg-yellow-500' : 'bg-muted-foreground'
                              }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {speed > 0 ? `${speed} mph` : 'Stationary'}
                      </span>
                      <span>🔋 {battery}%</span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground/60">
                      Updated {getTimeAgo(new Date(member.lastUpdate))}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>



        </div>)
      }

    </div>)
}

export default Live