/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sliders,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  Layers,
  Activity,
} from 'lucide-react';
import {
  DockSettings,
  LiquidGlassPreset,
  DEFAULT_DOCK_SETTINGS,
  getLiquidGlassPresetStyles,
} from '../utils/liquidNavPhysics.ts';
import { playHapticTick, playSnapThud } from '../utils/haptics.ts';

interface HyperOSCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DockSettings;
  onUpdateSettings: (settings: DockSettings) => void;
}

export const HyperOSCustomizerModal: React.FC<HyperOSCustomizerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const presets: { id: LiquidGlassPreset; name: string; desc: string; color: string }[] = [
    {
      id: 'hyperos-liquid',
      name: 'HyperOS 3 Liquid Glass',
      desc: 'Translucent frosted white glass with fluid specular sheen',
      color: 'bg-white border-neutral-300 text-neutral-800',
    },
    {
      id: 'porsche-crimson',
      name: 'Porsche Guards Crimson',
      desc: 'High-gloss Guards Red racing glass with deep crimson glow',
      color: 'bg-[#C90024] border-white/30 text-white',
    },
    {
      id: 'obsidian-stealth',
      name: 'Obsidian Stealth Glass',
      desc: 'Dark smoked obsidian glass with crimson beacon dot',
      color: 'bg-[#171717] border-white/20 text-white',
    },
    {
      id: 'hyper-chrome',
      name: 'Hyper Chrome Mirror',
      desc: 'Liquid metallic mercury reflection with high specular gloss',
      color: 'bg-neutral-200 border-neutral-400 text-neutral-900',
    },
  ];

  const handlePresetChange = (preset: LiquidGlassPreset) => {
    if (settings.hapticFeedback) playHapticTick(960);
    onUpdateSettings({ ...settings, preset });
  };

  const handlePowerChange = (power: number) => {
    if (settings.hapticFeedback) playHapticTick(750 + power * 150);
    onUpdateSettings({ ...settings, powerMultiplier: power });
  };

  const handleElasticityChange = (elasticity: 'high' | 'medium' | 'crisp') => {
    if (settings.hapticFeedback) playHapticTick(820);
    onUpdateSettings({ ...settings, elasticity });
  };

  const toggleHaptics = () => {
    const next = !settings.hapticFeedback;
    if (next) playHapticTick(880);
    onUpdateSettings({ ...settings, hapticFeedback: next });
  };

  const toggleDockPosition = (pos: 'floating' | 'attached') => {
    if (settings.hapticFeedback) playHapticTick(800);
    onUpdateSettings({ ...settings, dockPosition: pos });
  };

  const handleReset = () => {
    if (settings.hapticFeedback) playSnapThud();
    onUpdateSettings({ ...DEFAULT_DOCK_SETTINGS });
  };

  const activeStyle = getLiquidGlassPresetStyles(settings.preset);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="relative w-full max-w-lg bg-[#FFF8EF] rounded-3xl border border-[#F9EBDD] shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F9EBDD]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#171717] flex items-center justify-center text-white shadow-xs">
                <Sliders className="w-4 h-4 text-[#C90024]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base sm:text-lg font-black text-[#171717] uppercase tracking-tight">
                    HyperOS 3 Dock Customizer
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#C90024]/10 text-[#C90024] uppercase tracking-wider">
                    v3.0 Fluid
                  </span>
                </div>
                <p className="text-[11px] text-[#292929]/70">
                  Interactive liquid glass selection & momentum power settings
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200/60 text-[#292929]/70 hover:text-[#171717] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 pt-5">
            {/* Live Interactive Preview */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white flex flex-col items-center justify-center gap-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C90024]" /> Active Liquid Glass Surface
              </div>
              <div
                className={`px-6 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-3 ${activeStyle.pillBg} ${activeStyle.pillBorder} ${activeStyle.pillShadow}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${activeStyle.dotColor} animate-pulse`} />
                <span className={`text-xs font-bold ${activeStyle.labelActiveColor}`}>
                  {activeStyle.name}
                </span>
                <span className="text-[10px] opacity-70">
                  {settings.powerMultiplier}x Power
                </span>
              </div>
            </div>

            {/* Fling Power / Momentum Multiplier Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C90024]" />
                  Swipe Power & Momentum
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-[#F9EBDD] text-[#C90024]">
                  {settings.powerMultiplier.toFixed(1)}x Fling
                </span>
              </div>

              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={settings.powerMultiplier}
                onChange={(e) => handlePowerChange(parseFloat(e.target.value))}
                className="w-full accent-[#C90024] cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
              />

              <div className="flex justify-between text-[10px] text-[#292929]/60 font-semibold px-0.5">
                <span>0.5x (Gentle)</span>
                <span>1.2x (HyperOS Default)</span>
                <span>2.5x (Turbo Glide)</span>
              </div>
              <p className="text-[11px] text-[#292929]/70 italic">
                * As requested: the physical power you apply when sliding the liquid circle determines which button it glides and snaps to.
              </p>
            </div>

            {/* Liquid Glass Presets */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C90024]" />
                Liquid Glass Theme
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {presets.map((preset) => {
                  const isSelected = settings.preset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetChange(preset.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C90024] bg-white ring-2 ring-[#C90024]/20 shadow-sm'
                          : 'border-[#F9EBDD] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#171717]">{preset.name}</span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#C90024] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-[#292929]/60">{preset.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fluid Elasticity / Squash & Stretch */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#C90024]" />
                Liquid Viscosity & Elasticity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'high' as const, label: 'Viscous Liquid', desc: 'High stretch & bounce' },
                  { id: 'medium' as const, label: 'HyperOS 3', desc: 'Balanced fluid dynamic' },
                  { id: 'crisp' as const, label: 'Crisp Snap', desc: 'Minimal stretch' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleElasticityChange(item.id)}
                    className={`py-2 px-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                      settings.elasticity === item.id
                        ? 'bg-[#C90024] text-white border-[#C90024] shadow-xs'
                        : 'bg-white border-[#F9EBDD] text-[#292929] hover:bg-neutral-50'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[9px] font-normal opacity-80 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: Haptics & Dock Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={toggleHaptics}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#F9EBDD] text-left hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {settings.hapticFeedback ? (
                    <Volume2 className="w-4 h-4 text-[#C90024]" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-neutral-400" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[#171717]">Tactile Haptics</div>
                    <div className="text-[10px] text-[#292929]/60">Physical click & snap sound</div>
                  </div>
                </div>
                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    settings.hapticFeedback ? 'bg-[#C90024]' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.hapticFeedback ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </button>

              <button
                onClick={() =>
                  toggleDockPosition(settings.dockPosition === 'floating' ? 'attached' : 'floating')
                }
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#F9EBDD] text-left hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-[#171717]">Dock Placement</div>
                  <div className="text-[10px] text-[#292929]/60">
                    {settings.dockPosition === 'floating' ? 'Elevated Floating Pill' : 'Attached Bottom Bar'}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-[#FFF8EF] border border-[#F9EBDD] text-[#C90024]">
                  {settings.dockPosition === 'floating' ? 'Floating' : 'Docked'}
                </span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#F9EBDD]">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-bold text-[#292929]/70 hover:text-[#C90024] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>

            <button
              onClick={() => {
                if (settings.hapticFeedback) playSnapThud();
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#C90024] hover:bg-[#8F001B] text-white text-xs font-bold shadow-md shadow-[#C90024]/20 transition-all cursor-pointer"
            >
              Apply & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
