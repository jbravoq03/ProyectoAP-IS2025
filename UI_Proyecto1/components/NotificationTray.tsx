import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface NotificationTrayProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationTray({ visible, onClose }: NotificationTrayProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.notificationTray}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Notificaciones</Text>
              <Button 
                onPress={onClose} 
                variant="solid" 
                className="bg-gray-200" 
                size="sm"
              >
                <ButtonText className="text-black">×</ButtonText>
              </Button>
            </View>
            
            <View style={styles.notificationContent}>
              <Text style={styles.emptyMessage}>No hay notificaciones nuevas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationTray: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationContent: {
    padding: 20,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
