import React from "react";
import { View, StyleSheet, TouchableOpacity, PanResponder } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SliderProps {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledSliderProps<T extends FieldValues>
  extends Omit<SliderProps, "value" | "onValueChange"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
  containerStyle,
}) => {
  const trackWidth = 280;
  const thumbSize = 24;
  const trackHeight = 4;

  const percentage = (value - minimumValue) / (maximumValue - minimumValue);
  const thumbPosition = percentage * (trackWidth - thumbSize);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt) => {
          if (disabled) return;
          const { locationX } = evt.nativeEvent;
          updateValueFromPosition(locationX);
        },
        onPanResponderMove: (evt) => {
          if (disabled) return;
          const { locationX } = evt.nativeEvent;
          updateValueFromPosition(locationX);
        },
      }),
    [disabled, minimumValue, maximumValue, step]
  );

  const updateValueFromPosition = (locationX: number) => {
    const newPercentage = Math.max(0, Math.min(1, locationX / trackWidth));
    const newValue =
      minimumValue + newPercentage * (maximumValue - minimumValue);
    const steppedValue = Math.round(newValue / step) * step;

    onValueChange(Math.max(minimumValue, Math.min(maximumValue, steppedValue)));
  };

  const handleTrackPress = (event: any) => {
    if (disabled) return;
    const { locationX } = event.nativeEvent;
    updateValueFromPosition(locationX);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}

      <View style={styles.sliderContainer}>
        <TouchableOpacity
          style={styles.track}
          onPress={handleTrackPress}
          disabled={disabled}
          activeOpacity={1}
          {...panResponder.panHandlers}
        >
          <View style={styles.trackBackground} />
          <View style={[styles.trackFill, { width: `${percentage * 100}%` }]} />

          <View
            style={[
              styles.thumb,
              {
                left: thumbPosition,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <View style={styles.thumbInner} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.valueContainer}>
        <TextBox type="body3" style={styles.minValue}>
          {minimumValue}
        </TextBox>
        <TextBox type="body1" style={styles.currentValue}>
          {value}
        </TextBox>
        <TextBox type="body3" style={styles.maxValue}>
          {maximumValue}
        </TextBox>
      </View>
    </View>
  );
};

export function ControlledSlider<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledSliderProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Slider {...props} value={value} onValueChange={onChange} />
          {error && (
            <TextBox type="body3" style={styles.errorText}>
              {error.message}
            </TextBox>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  sliderContainer: {
    height: 40,
    justifyContent: "center",
    marginBottom: 8,
  },
  track: {
    width: 280,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    position: "relative",
  },
  trackBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  trackFill: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    marginTop: -10,
  },
  thumbInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  minValue: {
    opacity: 0.7,
  },
  currentValue: {
    fontWeight: "600",
    color: "#007AFF",
  },
  maxValue: {
    opacity: 0.7,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
